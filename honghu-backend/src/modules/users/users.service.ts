import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto, SwitchRoleDto, SelectIdentityDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        userRoles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        profile: {
          upsert: {
            create: {
              ...dto,
            },
            update: dto,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  async getMyRoles(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          where: { status: 'active' },
        },
        identities: {
          where: { status: 'verified' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const roles: Array<{ role: string; roleName: string; status: string; source: string }> = [];

    roles.push({
      role: 'registered',
      roleName: '注册用户',
      status: 'active',
      source: 'system',
    });

    for (const userRole of user.userRoles) {
      roles.push({
        role: userRole.role,
        roleName: userRole.roleName,
        status: userRole.status,
        source: 'user_role',
      });
    }

    for (const identity of user.identities) {
      const roleNameMap: Record<string, string> = {
        contestant: '参赛者',
        team_leader: '队长',
        enterprise_applicant: '企业申请者',
        organizer_applicant: '主办方申请者',
      };
      roles.push({
        role: identity.identityType,
        roleName: roleNameMap[identity.identityType] || identity.identityType,
        status: identity.status,
        source: 'identity',
      });
    }

    return roles;
  }

  async getDashboardType(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const roleToDashboard: Record<string, { type: string; url: string }> = {
      super_admin: { type: 'admin', url: '/admin' },
      operator: { type: 'operator', url: '/operator' },
      reviewer: { type: 'reviewer', url: '/reviewer' },
      contestant: { type: 'contestant', url: '/contestant' },
      team_leader: { type: 'contestant', url: '/contestant' },
      team_member: { type: 'contestant', url: '/contestant' },
      enterprise_applicant: { type: 'enterprise', url: '/enterprise' },
      organizer_applicant: { type: 'organizer', url: '/organizer' },
      registered: { type: 'registered', url: '/dashboard' },
      guest: { type: 'registered', url: '/dashboard' },
    };

    const dashboard = roleToDashboard[user.currentRole] || { type: 'registered', url: '/dashboard' };

    return {
      dashboardType: dashboard.type,
      currentRole: user.currentRole,
      redirectUrl: dashboard.url,
    };
  }

  async switchRole(id: string, dto: SwitchRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: true,
        identities: true,
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const validRoles = ['registered', 'contestant', 'team_leader', 'team_member', 'reviewer', 'operator', 'super_admin', 'enterprise_applicant', 'organizer_applicant'];
    
    if (!validRoles.includes(dto.currentRole)) {
      throw new BadRequestException('无效的角色');
    }

    if (dto.currentRole !== 'registered') {
      const hasRole = user.userRoles.some(r => r.role === dto.currentRole && r.status === 'active')
        || user.identities.some(i => i.identityType === dto.currentRole && i.status === 'verified');
      
      if (!hasRole) {
        throw new BadRequestException('您没有该角色');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { currentRole: dto.currentRole },
    });

    const roleToDashboard: Record<string, string> = {
      super_admin: '/admin',
      operator: '/operator',
      reviewer: '/reviewer',
      contestant: '/contestant',
      team_leader: '/contestant',
      team_member: '/contestant',
      enterprise_applicant: '/enterprise',
      organizer_applicant: '/organizer',
      registered: '/dashboard',
    };

    return {
      user: updatedUser,
      redirectUrl: roleToDashboard[updatedUser.currentRole] || '/dashboard',
    };
  }

  async selectIdentity(id: string, dto: SelectIdentityDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const roleMap: Record<string, string> = {
      contestant: '参赛者',
      team_leader: '队长',
      enterprise_applicant: '企业申请者',
      organizer_applicant: '主办方申请者',
    };

    const roleName = roleMap[dto.identityType];
    if (!roleName) {
      throw new BadRequestException('无效的身份类型');
    }

    await this.prisma.userIdentity.upsert({
      where: {
        userId_identityType: {
          userId: id,
          identityType: dto.identityType,
        },
      },
      create: {
        userId: id,
        identityType: dto.identityType,
        status: 'pending',
      },
      update: {
        status: 'pending',
      },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        primaryRole: dto.identityType,
        currentRole: dto.identityType,
      },
    });

    const redirectUrlMap: Record<string, string> = {
      contestant: '/contestant',
      team_leader: '/contestant',
      enterprise_applicant: '/enterprise',
      organizer_applicant: '/organizer',
    };

    return {
      user: {
        id: updatedUser.id,
        primaryRole: updatedUser.primaryRole,
        currentRole: updatedUser.currentRole,
      },
      redirectUrl: redirectUrlMap[dto.identityType] || '/dashboard',
    };
  }
}
