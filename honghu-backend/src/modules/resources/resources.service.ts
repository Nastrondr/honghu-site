import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateResourceDto, UpdateResourceDto, ResourceQueryDto } from './dto/resources.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

const ACCESS_LEVELS = ['public', 'contestant', 'team', 'reviewer', 'operator'];

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async checkAccess(userId: string | null, competitionId: string, trackId?: string) {
    if (!userId) {
      return { canAccess: false, level: 'public' };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          where: {
            competitionId,
            status: 'approved',
          },
        },
        teamMemberships: {
          where: {
            memberStatus: 'active',
            team: {
              competitionId,
              status: { in: ['forming', 'complete', 'locked'] },
            },
          },
        },
      },
    });

    const hasEnrollment = user?.enrollments && user.enrollments.length > 0;
    const hasTeam = user?.teamMemberships && user.teamMemberships.length > 0;

    if (hasEnrollment || hasTeam) {
      return { canAccess: true, level: 'contestant' };
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId,
        status: 'active',
      },
    });

    const roles = userRoles.map((r) => r.role);
    if (roles.includes('operator') || roles.includes('super_admin')) {
      return { canAccess: true, level: 'operator' };
    }
    if (roles.includes('reviewer')) {
      return { canAccess: true, level: 'reviewer' };
    }

    return { canAccess: false, level: 'public' };
  }

  private canAccessResource(userLevel: string, resourceLevel: string): boolean {
    if (resourceLevel === 'public') {
      return true;
    }
    if (userLevel === 'operator') {
      return true;
    }
    if (resourceLevel === 'contestant' && (userLevel === 'contestant' || userLevel === 'team')) {
      return true;
    }
    if (resourceLevel === 'team' && (userLevel === 'team')) {
      return true;
    }
    if (resourceLevel === 'reviewer' && userLevel === 'reviewer') {
      return true;
    }
    return false;
  }

  async findAll(userId: string | null, query: ResourceQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, competitionId, trackId, resourceType, accessLevel } = query;

    const where: any = {
      isActive: true,
    };

    if (competitionId) {
      where.competitionId = competitionId;
    }

    if (trackId) {
      where.trackId = trackId;
    }

    if (resourceType) {
      where.resourceType = resourceType;
    }

    if (accessLevel) {
      where.accessLevel = accessLevel;
    }

    const [resources, total] = await Promise.all([
      this.prisma.resource.findMany({
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
        },
      }),
      this.prisma.resource.count({ where }),
    ]);

    return new PaginatedResponse(resources, total, page, pageSize);
  }

  async findOne(userId: string | null, resourceId: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: resourceId },
      include: {
        competition: {
          select: { id: true, name: true, slug: true },
        },
        track: {
          select: { id: true, name: true },
        },
      },
    });

    if (!resource) {
      throw new NotFoundException('资源不存在');
    }

    const { level: userLevel } = await this.checkAccess(userId, resource.competitionId, resource.trackId || undefined);

    if (!this.canAccessResource(userLevel, resource.accessLevel)) {
      throw new ForbiddenException('您没有权限访问此资源');
    }

    return resource;
  }

  async download(userId: string | null, resourceId: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new NotFoundException('资源不存在');
    }

    if (!resource.isActive) {
      throw new ForbiddenException('资源已下架');
    }

    const { level: userLevel } = await this.checkAccess(userId, resource.competitionId, resource.trackId || undefined);

    if (!this.canAccessResource(userLevel, resource.accessLevel)) {
      throw new ForbiddenException('您没有权限下载此资源');
    }

    await this.prisma.resource.update({
      where: { id: resourceId },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    return {
      downloadUrl: resource.fileUrl,
      fileName: resource.name,
      fileSize: resource.fileSize,
    };
  }

  async adminCreate(dto: CreateResourceDto, adminId: string) {
    return this.prisma.resource.create({
      data: {
        competitionId: dto.competitionId,
        trackId: dto.trackId,
        resourceType: dto.resourceType,
        name: dto.name,
        description: dto.description,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize,
        fileType: dto.fileType,
        accessLevel: dto.accessLevel || 'contestant',
        createdBy: adminId,
      },
    });
  }

  async adminUpdate(resourceId: string, dto: UpdateResourceDto) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new NotFoundException('资源不存在');
    }

    return this.prisma.resource.update({
      where: { id: resourceId },
      data: dto,
    });
  }

  async adminDelete(resourceId: string) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new NotFoundException('资源不存在');
    }

    return this.prisma.resource.delete({
      where: { id: resourceId },
    });
  }

  async adminFindAll(query: ResourceQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, competitionId, trackId, resourceType } = query;

    const where: any = {};

    if (competitionId) {
      where.competitionId = competitionId;
    }

    if (trackId) {
      where.trackId = trackId;
    }

    if (resourceType) {
      where.resourceType = resourceType;
    }

    const [resources, total] = await Promise.all([
      this.prisma.resource.findMany({
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
        },
      }),
      this.prisma.resource.count({ where }),
    ]);

    return new PaginatedResponse(resources, total, page, pageSize);
  }
}