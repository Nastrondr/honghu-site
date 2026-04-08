import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateTeamDto,
  UpdateTeamDto,
  TeamQueryDto,
  InviteMemberDto,
  InviteByEmailDto,
  RespondInvitationDto,
  RemoveMemberDto,
  TransferCaptainDto,
  JoinTeamDto,
} from './dto/team.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

const TEAM_ROLES = ['leader', 'member'];
const TEAM_STATUSES = ['forming', 'complete', 'locked', 'dissolved'];
const INVITATION_STATUSES = ['pending', 'accepted', 'rejected', 'expired', 'cancelled'];

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTeamDto) {
    const competition = await this.prisma.competition.findUnique({
      where: { id: dto.competitionId },
    });

    if (!competition) {
      throw new NotFoundException('赛事不存在');
    }

    const track = await this.prisma.track.findUnique({
      where: { id: dto.trackId },
    });

    if (!track || track.competitionId !== dto.competitionId) {
      throw new NotFoundException('赛道不存在');
    }

    const existingTeam = await this.prisma.team.findFirst({
      where: {
        competitionId: dto.competitionId,
        leaderId: userId,
        status: { in: ['forming', 'complete'] },
      },
    });

    if (existingTeam) {
      throw new ForbiddenException('您已创建过团队');
    }

    const team = await this.prisma.team.create({
      data: {
        competitionId: dto.competitionId,
        trackId: dto.trackId,
        name: dto.name,
        avatarUrl: dto.avatarUrl,
        description: dto.description,
        leaderId: userId,
        inviteCode: generateInviteCode(),
        maxMembers: dto.maxMembers || competition.maxTeamSize || 5,
        status: 'forming',
      },
      include: {
        competition: {
          select: { id: true, name: true, slug: true },
        },
        track: {
          select: { id: true, name: true },
        },
        leader: {
          select: { id: true, username: true, email: true },
        },
        members: true,
      },
    });

    await this.prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId,
        role: 'leader',
        memberStatus: 'active',
        joinedAt: new Date(),
      },
    });

    return this.findOne(userId, team.id);
  }

  async update(userId: string, teamId: string, dto: UpdateTeamDto) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以更新团队信息');
    }

    if (team.status === 'locked' || team.status === 'dissolved') {
      throw new BadRequestException('当前状态不允许更新');
    }

    const updated = await this.prisma.team.update({
      where: { id: teamId },
      data: dto,
    });

    return this.findOne(userId, teamId);
  }

  async findOne(userId: string, teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        competition: {
          select: { id: true, name: true, slug: true, posterUrl: true },
        },
        track: {
          select: { id: true, name: true },
        },
        leader: {
          select: { id: true, username: true, email: true, profile: true },
        },
        members: {
          where: { memberStatus: { not: 'left' } },
          include: {
            user: {
              select: { id: true, username: true, email: true, profile: true },
            },
          },
        },
        _count: {
          select: { members: true, invitations: true, works: true },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    return team;
  }

  async findMyTeams(userId: string, query: TeamQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, competitionId, trackId, status } = query;

    const memberTeams = await this.prisma.teamMember.findMany({
      where: { userId, memberStatus: { not: 'left' } },
      select: { teamId: true },
    });

    const teamIds = memberTeams.map((m) => m.teamId);

    const where: any = {
      id: { in: teamIds },
    };

    if (status) {
      where.status = status;
    }

    if (competitionId) {
      where.competitionId = competitionId;
    }

    if (trackId) {
      where.trackId = trackId;
    }

    const [teams, total] = await Promise.all([
      this.prisma.team.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          competition: {
            select: { id: true, name: true, slug: true },
          },
          track: {
            select: { id: true, name: true },
          },
          leader: {
            select: { id: true, username: true },
          },
          _count: {
            select: { members: true },
          },
        },
      }),
      this.prisma.team.count({ where }),
    ]);

    return new PaginatedResponse(teams, total, page, pageSize);
  }

  async findTeamByCode(userId: string, inviteCode: string) {
    const team = await this.prisma.team.findUnique({
      where: { inviteCode },
      include: {
        competition: {
          select: { id: true, name: true, slug: true },
        },
        track: {
          select: { id: true, name: true },
        },
        _count: {
          select: { members: true },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('团队不存在或邀请码已失效');
    }

    return team;
  }

  async inviteMember(userId: string, teamId: string, dto: InviteMemberDto) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以邀请成员');
    }

    if (team.status !== 'forming') {
      throw new BadRequestException('当前团队状态不允许邀请成员');
    }

    const memberCount = await this.prisma.teamMember.count({
      where: { teamId, memberStatus: { not: 'left' } },
    });

    if (memberCount >= team.maxMembers) {
      throw new BadRequestException('团队成员已满');
    }

    const existingMember = await this.prisma.teamMember.findUnique({
      where: {
        userId_teamId: {
          userId: dto.inviteeId,
          teamId,
        },
      },
    });

    if (existingMember && existingMember.memberStatus !== 'left') {
      throw new BadRequestException('该用户已是团队成员');
    }

    const existingInvitation = await this.prisma.teamInvitation.findFirst({
      where: {
        teamId,
        inviteeId: dto.inviteeId,
        status: 'pending',
      },
    });

    if (existingInvitation) {
      throw new BadRequestException('已向该用户发送过邀请');
    }

    const invitation = await this.prisma.teamInvitation.create({
      data: {
        teamId,
        inviterId: userId,
        inviteeId: dto.inviteeId,
        role: dto.role || 'member',
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      include: {
        team: {
          select: { id: true, name: true },
        },
        inviter: {
          select: { id: true, username: true },
        },
        invitee: {
          select: { id: true, username: true, email: true },
        },
      },
    });

    return invitation;
  }

  async inviteByEmail(userId: string, teamId: string, dto: InviteByEmailDto) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以邀请成员');
    }

    if (team.status !== 'forming') {
      throw new BadRequestException('当前团队状态不允许邀请成员');
    }

    const invitee = await this.prisma.user.findUnique({
      where: { email: dto.inviteeEmail },
    });

    if (!invitee) {
      throw new NotFoundException('用户不存在');
    }

    const memberCount = await this.prisma.teamMember.count({
      where: { teamId, memberStatus: { not: 'left' } },
    });

    if (memberCount >= team.maxMembers) {
      throw new BadRequestException('团队成员已满');
    }

    const existingInvitation = await this.prisma.teamInvitation.findFirst({
      where: {
        teamId,
        inviteeId: invitee.id,
        status: 'pending',
      },
    });

    if (existingInvitation) {
      throw new BadRequestException('已向该用户发送过邀请');
    }

    const invitation = await this.prisma.teamInvitation.create({
      data: {
        teamId,
        inviterId: userId,
        inviteeId: invitee.id,
        inviteeEmail: dto.inviteeEmail,
        role: dto.role || 'member',
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      include: {
        team: {
          select: { id: true, name: true },
        },
        inviter: {
          select: { id: true, username: true },
        },
        invitee: {
          select: { id: true, username: true, email: true },
        },
      },
    });

    return invitation;
  }

  async acceptInvitation(userId: string, teamIdOrInvitationId: string) {
    const invitation = await this.prisma.teamInvitation.findFirst({
      where: {
        OR: [
          { id: teamIdOrInvitationId },
          { teamId: teamIdOrInvitationId, inviteeId: userId, status: 'pending' },
        ],
      },
    });

    if (!invitation) {
      throw new NotFoundException('邀请不存在');
    }

    if (invitation.inviteeId !== userId) {
      throw new ForbiddenException('该邀请不是发给你的');
    }

    if (invitation.status !== 'pending') {
      throw new BadRequestException('邀请已处理或已过期');
    }

    if (invitation.expiresAt && invitation.expiresAt < new Date()) {
      throw new BadRequestException('邀请已过期');
    }

    const team = await this.prisma.team.findUnique({
      where: { id: invitation.teamId },
    });

    if (!team || team.status !== 'forming') {
      throw new BadRequestException('团队已不可加入');
    }

    const memberCount = await this.prisma.teamMember.count({
      where: { teamId: invitation.teamId, memberStatus: { not: 'left' } },
    });

    if (memberCount >= team.maxMembers) {
      throw new BadRequestException('团队成员已满');
    }

    await this.prisma.$transaction([
      this.prisma.teamInvitation.update({
        where: { id: invitation.id },
        data: {
          status: 'accepted',
          respondedAt: new Date(),
        },
      }),
      this.prisma.teamMember.upsert({
        where: {
          userId_teamId: {
            userId,
            teamId: invitation.teamId,
          },
        },
        create: {
          teamId: invitation.teamId,
          userId,
          role: invitation.role,
          memberStatus: 'active',
          joinedAt: new Date(),
        },
        update: {
          role: invitation.role,
          memberStatus: 'active',
          joinedAt: new Date(),
          leftAt: null,
        },
      }),
    ]);

    return this.findOne(userId, invitation.teamId);
  }

  async rejectInvitation(userId: string, invitationId: string, comment?: string) {
    const invitation = await this.prisma.teamInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException('邀请不存在');
    }

    if (invitation.inviteeId !== userId) {
      throw new ForbiddenException('该邀请不是发给你的');
    }

    if (invitation.status !== 'pending') {
      throw new BadRequestException('邀请已处理或已过期');
    }

    await this.prisma.teamInvitation.update({
      where: { id: invitationId },
      data: {
        status: 'rejected',
        respondedAt: new Date(),
        responseComment: comment,
      },
    });

    return { message: '已拒绝邀请' };
  }

  async respondToInvitation(userId: string, dto: RespondInvitationDto) {
    if (dto.accept) {
      return this.acceptInvitation(userId, dto.invitationId);
    } else {
      return this.rejectInvitation(userId, dto.invitationId, dto.responseComment);
    }
  }

  async findMyInvitations(userId: string) {
    const invitations = await this.prisma.teamInvitation.findMany({
      where: {
        inviteeId: userId,
        status: 'pending',
      },
      include: {
        team: {
          select: { id: true, name: true, competitionId: true, trackId: true },
        },
        inviter: {
          select: { id: true, username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return invitations;
  }

  async removeMember(userId: string, teamId: string, dto: RemoveMemberDto) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以移除成员');
    }

    if (dto.memberId === userId) {
      throw new BadRequestException('队长不能移除自己，请使用转移队长');
    }

    const member = await this.prisma.teamMember.findUnique({
      where: {
        userId_teamId: {
          userId: dto.memberId,
          teamId,
        },
      },
    });

    if (!member || member.memberStatus === 'left') {
      throw new NotFoundException('成员不存在');
    }

    await this.prisma.teamMember.update({
      where: { id: member.id },
      data: {
        memberStatus: 'left',
        leftAt: new Date(),
        leftReason: dto.reason || 'removed_by_leader',
      },
    });

    await this.prisma.teamInvitation.deleteMany({
      where: {
        teamId,
        inviteeId: dto.memberId,
        status: 'pending',
      },
    });

    return { message: '成员已移除' };
  }

  async leaveTeam(userId: string, teamId: string, reason?: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId === userId) {
      throw new ForbiddenException('队长不能直接退队，请先转移队长或解散团队');
    }

    const member = await this.prisma.teamMember.findUnique({
      where: {
        userId_teamId: {
          userId,
          teamId,
        },
      },
    });

    if (!member || member.memberStatus === 'left') {
      throw new NotFoundException('您不是团队成员');
    }

    await this.prisma.teamMember.update({
      where: { id: member.id },
      data: {
        memberStatus: 'left',
        leftAt: new Date(),
        leftReason: reason || 'left_by_member',
      },
    });

    return { message: '已退出团队' };
  }

  async transferCaptain(userId: string, teamId: string, dto: TransferCaptainDto) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以转移队长权限');
    }

    if (dto.newLeaderId === userId) {
      throw new BadRequestException('不能转移给自己');
    }

    const newLeaderMember = await this.prisma.teamMember.findUnique({
      where: {
        userId_teamId: {
          userId: dto.newLeaderId,
          teamId,
        },
      },
    });

    if (!newLeaderMember || newLeaderMember.memberStatus === 'left') {
      throw new NotFoundException('新队长必须是团队成员');
    }

    await this.prisma.$transaction([
      this.prisma.teamMember.update({
        where: { id: newLeaderMember.id },
        data: { role: 'leader' },
      }),
      this.prisma.team.update({
        where: { id: teamId },
        data: { leaderId: dto.newLeaderId },
      }),
    ]);

    return this.findOne(dto.newLeaderId, teamId);
  }

  async dissolveTeam(userId: string, teamId: string, reason?: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以解散团队');
    }

    if (team.status === 'dissolved') {
      throw new BadRequestException('团队已解散');
    }

    await this.prisma.$transaction([
      this.prisma.team.update({
        where: { id: teamId },
        data: {
          status: 'dissolved',
          dissolvedAt: new Date(),
          dissolvedReason: reason,
        },
      }),
      this.prisma.teamMember.updateMany({
        where: { teamId, memberStatus: { not: 'left' } },
        data: {
          memberStatus: 'left',
          leftAt: new Date(),
          leftReason: reason || 'team_dissolved',
        },
      }),
      this.prisma.teamInvitation.updateMany({
        where: { teamId, status: 'pending' },
        data: { status: 'cancelled' },
      }),
    ]);

    return { message: '团队已解散' };
  }

  async lockTeam(userId: string, teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('团队不存在');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('只有队长可以锁定团队');
    }

    const memberCount = await this.prisma.teamMember.count({
      where: { teamId, memberStatus: { not: 'left' } },
    });

    if (memberCount < 2) {
      throw new BadRequestException('团队至少需要2名成员才能锁定');
    }

    await this.prisma.team.update({
      where: { id: teamId },
      data: {
        status: 'locked',
        lockedAt: new Date(),
      },
    });

    return { message: '团队已锁定' };
  }

  async findAllTeams(query: TeamQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, status = 'forming', competitionId, trackId } = query;

    const where: any = {
      status: status || 'forming',
    };

    if (competitionId) {
      where.competitionId = competitionId;
    }

    if (trackId) {
      where.trackId = trackId;
    }

    const [teams, total] = await Promise.all([
      this.prisma.team.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          competition: {
            select: { id: true, name: true, slug: true },
          },
          track: {
            select: { id: true, name: true },
          },
          leader: {
            select: { id: true, username: true },
          },
          _count: {
            select: { members: true },
          },
        },
      }),
      this.prisma.team.count({ where }),
    ]);

    return new PaginatedResponse(teams, total, page, pageSize);
  }
}