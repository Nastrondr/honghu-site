import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateWorkDto, UpdateWorkDto, CreateVersionDto, UpdateVersionDto, SubmitVersionDto, WorkQueryDto, AttachmentDto } from './dto/works.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  private async checkIsTeamMember(userId: string, teamId: string) {
    return this.prisma.teamMember.findFirst({
      where: { teamId, userId, memberStatus: 'active' },
    });
  }

  async create(userId: string, dto: CreateWorkDto) {
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

    if (!dto.userId && !dto.teamId) {
      throw new BadRequestException('userId 和 teamId 不能同时为空');
    }

    if (dto.userId && dto.teamId) {
      throw new BadRequestException('userId 和 teamId 不能同时有值');
    }

    if (dto.teamId) {
      const member = await this.checkIsTeamMember(userId, dto.teamId);
      if (!member) {
        throw new ForbiddenException('您不是团队成员');
      }
    }

    if (dto.userId) {
      if (dto.userId !== userId) {
        throw new ForbiddenException('您只能创建自己的个人作品');
      }
      const enrollment = await this.prisma.enrollment.findFirst({
        where: { userId: dto.userId, competitionId: dto.competitionId, status: 'approved' },
      });
      if (!enrollment) {
        throw new ForbiddenException('您没有该赛事的报名记录或报名未通过审核');
      }
    }

    const work = await this.prisma.work.create({
      data: {
        competitionId: dto.competitionId,
        trackId: dto.trackId,
        userId: dto.userId,
        teamId: dto.teamId,
        title: dto.title,
        description: dto.description,
        status: 'draft',
        isFinal: false,
      },
      include: {
        competition: { select: { id: true, name: true, slug: true } },
        track: { select: { id: true, name: true } },
        team: { select: { id: true, name: true } },
      },
    });

    return work;
  }

  async findOne(userId: string, workId: string) {
    const work = await this.prisma.work.findUnique({
      where: { id: workId },
      include: {
        competition: { select: { id: true, name: true, slug: true } },
        track: { select: { id: true, name: true } },
        team: { select: { id: true, name: true } },
        versions: {
          orderBy: { versionNumber: 'desc' },
          take: 10,
          include: { attachments: true },
        },
      },
    });

    if (!work) {
      throw new NotFoundException('作品不存在');
    }

    if (work.teamId) {
      const member = await this.checkIsTeamMember(userId, work.teamId);
      if (!member) {
        if (work.status !== 'archived' && work.status !== 'public_result') {
          throw new ForbiddenException('您没有权限查看此作品');
        }
      }
    } else if (work.userId) {
      if (work.userId !== userId) {
        if (work.status !== 'archived' && work.status !== 'public_result') {
          throw new ForbiddenException('您没有权限查看此作品');
        }
      }
    } else {
      if (work.status !== 'archived' && work.status !== 'public_result') {
        throw new ForbiddenException('作品无有效归属');
      }
    }

    return work;
  }

  async findMyWorks(userId: string, query: WorkQueryDto & PaginationDto) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;
    const { competitionId, trackId, status } = query;

    const teamMemberships = await this.prisma.teamMember.findMany({
      where: { userId, memberStatus: 'active' },
      select: { teamId: true },
    });
    const teamIds = teamMemberships.map(m => m.teamId);

    const where: any = {
      teamId: { in: teamIds },
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

    const [works, total] = await Promise.all([
      this.prisma.work.findMany({
        where,
        skip: Number((page - 1) * pageSize) || 0,
        take: Number(pageSize) || 20,
        orderBy: { updatedAt: 'desc' },
        include: {
          competition: { select: { id: true, name: true, slug: true } },
          track: { select: { id: true, name: true } },
        },
      }),
      this.prisma.work.count({ where }),
    ]);

    return new PaginatedResponse(works, total, page, pageSize);
  }

  async update(userId: string, workId: string, dto: UpdateWorkDto) {
    const work = await this.prisma.work.findUnique({
      where: { id: workId },
    });

    if (!work) {
      throw new NotFoundException('作品不存在');
    }

    if (work.teamId) {
      const member = await this.checkIsTeamMember(userId, work.teamId);
      if (!member) {
        throw new ForbiddenException('您没有权限修改此作品');
      }
    } else if (work.userId) {
      if (work.userId !== userId) {
        throw new ForbiddenException('您没有权限修改此作品');
      }
    } else {
      throw new ForbiddenException('作品无有效归属');
    }

    if (work.isFinal) {
      throw new ForbiddenException('作品已提交最终版，无法修改');
    }

    if (work.status !== 'draft' && work.status !== 'saved') {
      throw new ForbiddenException('当前状态不允许修改');
    }

    return this.prisma.work.update({
      where: { id: workId },
      data: dto,
    });
  }

  async createVersion(userId: string, workId: string, dto: CreateVersionDto) {
    const work = await this.prisma.work.findUnique({
      where: { id: workId },
      include: { versions: { orderBy: { versionNumber: 'desc' } } },
    });

    if (!work) {
      throw new NotFoundException('作品不存在');
    }

    if (work.teamId) {
      const member = await this.checkIsTeamMember(userId, work.teamId);
      if (!member) {
        throw new ForbiddenException('您不是团队成员，无权创建版本');
      }
    } else if (work.userId) {
      if (work.userId !== userId) {
        throw new ForbiddenException('您不是作品作者，无权创建版本');
      }
    } else {
      throw new ForbiddenException('作品无有效归属，无权创建版本');
    }

    if (work.isFinal) {
      throw new ForbiddenException('作品已提交最终版，无法创建新版本');
    }

    if (work.status !== 'draft' && work.status !== 'saved') {
      throw new BadRequestException('当前状态不允许创建新版本');
    }

    const latestVersion = work.versions[0];
    const versionNo = latestVersion ? latestVersion.versionNumber + 1 : 1;

    const version = await this.prisma.workVersion.create({
      data: {
        workId,
        versionNumber: versionNo,
        title: dto.title,
        description: dto.description,
        content: dto.content,
        isFinal: dto.isFinal || false,
      },
    });

    return version;
  }

  async updateVersion(userId: string, versionId: string, dto: UpdateVersionDto) {
    const version = await this.prisma.workVersion.findUnique({
      where: { id: versionId },
      include: { work: true },
    });

    if (!version) {
      throw new NotFoundException('版本不存在');
    }

    const work = version.work;
    const member = work.teamId ? await this.checkIsTeamMember(userId, work.teamId) : null;

    if (!member) {
      throw new ForbiddenException('您没有权限修改版本');
    }

    if (work.status !== 'draft' && work.status !== 'saved') {
      throw new ForbiddenException('已提交的作品无法修改版本');
    }

    return this.prisma.workVersion.update({
      where: { id: versionId },
      data: dto,
    });
  }

  async submitVersion(userId: string, workId: string, dto: SubmitVersionDto) {
    const work = await this.prisma.work.findUnique({
      where: { id: workId },
    });

    if (!work) {
      throw new NotFoundException('作品不存在');
    }

    if (work.teamId) {
      const member = await this.checkIsTeamMember(userId, work.teamId);
      if (!member || member.role !== 'leader') {
        throw new ForbiddenException('只有队长可以提交最终版');
      }
    } else if (work.userId) {
      if (work.userId !== userId) {
        throw new ForbiddenException('只有作品作者可以提交');
      }
    } else {
      throw new ForbiddenException('作品无有效归属');
    }

    const version = await this.prisma.workVersion.findUnique({
      where: { id: dto.versionId },
    });

    if (!version || version.workId !== workId) {
      throw new NotFoundException('版本不存在');
    }

    await this.prisma.$transaction([
      this.prisma.workVersion.update({
        where: { id: dto.versionId },
        data: { submittedAt: new Date() },
      }),
      this.prisma.work.update({
        where: { id: workId },
        data: {
          currentVersionId: dto.versionId,
          status: dto.isFinal ? 'submitted' : 'saved',
          isFinal: dto.isFinal || false,
          submittedAt: new Date(),
        },
      }),
    ]);

    return { message: dto.isFinal ? '已提交最终版' : '已保存为当前版本' };
  }

  async addAttachment(versionId: string, dto: AttachmentDto) {
    const version = await this.prisma.workVersion.findUnique({
      where: { id: versionId },
      include: { work: true },
    });

    if (!version) {
      throw new NotFoundException('版本不存在');
    }

    if (version.work.status !== 'draft' && version.work.status !== 'saved') {
      throw new ForbiddenException('已提交的作品无法添加附件');
    }

    const ALLOWED_FILE_TYPES = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'video/mp4',
    ];

    if (dto.fileType && !ALLOWED_FILE_TYPES.includes(dto.fileType)) {
      throw new BadRequestException('仅支持 doc、docx、pdf、mp4 格式');
    }

    return this.prisma.workAttachment.create({
      data: {
        versionId,
        workId: version.workId,
        fileName: dto.name,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize ? BigInt(dto.fileSize) : null,
        fileType: dto.fileType,
      },
    });
  }

  async deleteAttachment(attachmentId: string) {
    const attachment = await this.prisma.workAttachment.findUnique({
      where: { id: attachmentId },
      include: { version: { include: { work: true } } },
    });

    if (!attachment) {
      throw new NotFoundException('附件不存在');
    }

    if (attachment.version.work.status !== 'draft' && attachment.version.work.status !== 'saved') {
      throw new ForbiddenException('已提交的作品无法删除附件');
    }

    return this.prisma.workAttachment.delete({
      where: { id: attachmentId },
    });
  }

  async adminFindAll(query: WorkQueryDto & PaginationDto) {
    const pageNum = Number(query.page) || 1;
    const pageSizeNum = Number(query.pageSize) || 20;
    const { competitionId, trackId, status } = query;

    const where: any = {};

    if (competitionId) where.competitionId = competitionId;
    if (trackId) where.trackId = trackId;
    if (status) where.status = status;

    const skip = (pageNum - 1) * pageSizeNum;
    const [works, total] = await Promise.all([
      this.prisma.work.findMany({
        where,
        skip: Number.isInteger(skip) ? skip : 0,
        take: Number.isInteger(pageSizeNum) ? pageSizeNum : 20,
        orderBy: { updatedAt: 'desc' },
        include: {
          competition: { select: { id: true, name: true, slug: true } },
          track: { select: { id: true, name: true } },
          team: { select: { id: true, name: true } },
        },
      }),
      this.prisma.work.count({ where }),
    ]);

    return new PaginatedResponse(works, total, pageNum, pageSizeNum);
  }
}