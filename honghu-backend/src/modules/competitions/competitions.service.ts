import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';
import {
  CompetitionQueryDto,
  CreateCompetitionDto,
  TrackQueryDto,
  CreateTrackDto,
} from './dto/competitions.dto';

@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: CompetitionQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, sortBy = 'createdAt', sortOrder = 'desc', status, isFeatured, keyword } = query;

    const where: any = {
      isPublic: true,
    };

    if (status) {
      where.status = status;
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const [competitions, total] = await Promise.all([
      this.prisma.competition.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
        include: {
          tracks: {
            where: { status: 'active' },
            take: 5,
          },
        },
      }),
      this.prisma.competition.count({ where }),
    ]);

    return new PaginatedResponse(competitions, total, page, pageSize);
  }

  async findOne(id: string) {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
      include: {
        tracks: {
          where: { status: 'active' },
        },
        stages: {
          orderBy: { stageOrder: 'asc' },
        },
      },
    });

    if (!competition) {
      throw new NotFoundException('赛事不存在');
    }

    return competition;
  }

  async create(dto: CreateCompetitionDto & { trackNames?: string[] }, userId: string) {
    // 使用事务确保赛事和赛道一起创建
    const result = await this.prisma.$transaction(async (prisma) => {
      // 1. 创建赛事
      const competition = await prisma.competition.create({
        data: {
          name: dto.name,
          slug: dto.slug,
          description: dto.description,
          posterUrl: dto.posterUrl,
          ruleUrl: dto.ruleUrl,
          maxTeamSize: dto.maxTeamSize,
          isPublic: dto.isPublic,
          status: dto.status,
          registrationStart: dto.registrationStart,
          registrationEnd: dto.registrationEnd,
          competitionStart: dto.competitionStart,
          competitionEnd: dto.competitionEnd,
          createdBy: userId,
        },
      });

      // 2. 如果提供了trackNames，创建赛道
      if (dto.trackNames && Array.isArray(dto.trackNames) && dto.trackNames.length > 0) {
        for (const trackName of dto.trackNames) {
          await prisma.track.create({
            data: {
              name: trackName,
              competitionId: competition.id,
              status: 'active',
            },
          });
        }
      }

      // 3. 返回包含tracks的赛事
      return prisma.competition.findUnique({
        where: { id: competition.id },
        include: { tracks: true },
      });
    });

    return result;
  }

  async update(id: string, dto: CreateCompetitionDto & { trackNames?: string[] }) {
    await this.findOne(id);

    // 使用事务确保赛事和赛道一起更新
    const result = await this.prisma.$transaction(async (prisma) => {
      // 1. 更新赛事基础信息（排除 trackNames）
      const { trackNames, ...competitionData } = dto;
      const competition = await prisma.competition.update({
        where: { id },
        data: competitionData,
      });

      // 2. 如果提供了trackNames，同步赛道
      if (trackNames && Array.isArray(trackNames)) {
        // 获取当前已有的tracks
        const existingTracks = await prisma.track.findMany({
          where: { competitionId: id },
        });

        const existingTrackNames = existingTracks.map(t => t.name);

        // 需要新增的赛道
        const tracksToAdd = trackNames.filter(name => !existingTrackNames.includes(name));

        // 需要删除的赛道（不在新列表中的）
        const tracksToRemove = existingTracks.filter(t => !trackNames.includes(t.name));

        // 创建新赛道
        for (const trackName of tracksToAdd) {
          await prisma.track.create({
            data: {
              name: trackName,
              competitionId: id,
              status: 'active',
            },
          });
        }

        // 删除不再需要的赛道
        for (const track of tracksToRemove) {
          await prisma.track.delete({
            where: { id: track.id },
          });
        }
      }

      // 3. 返回更新后的赛事（包含tracks）
      return prisma.competition.findUnique({
        where: { id },
        include: {
          tracks: true,
        },
      });
    });

    return result;
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);

    const competition = await this.prisma.competition.update({
      where: { id },
      data: { status },
    });

    return competition;
  }

  async remove(id: string) {
    // 先检查赛事是否存在
    await this.findOne(id);

    // 检查是否有关联数据
    const [tracksCount, enrollmentsCount, worksCount] = await Promise.all([
      this.prisma.track.count({ where: { competitionId: id } }),
      this.prisma.enrollment.count({ where: { competitionId: id } }),
      this.prisma.work.count({ where: { competitionId: id } }),
    ]);

    if (tracksCount > 0) {
      throw new ForbiddenException(`该赛事下存在 ${tracksCount} 个赛道，无法删除`);
    }

    if (enrollmentsCount > 0) {
      throw new ForbiddenException(`该赛事下存在 ${enrollmentsCount} 条报名记录，无法删除`);
    }

    if (worksCount > 0) {
      throw new ForbiddenException(`该赛事下存在 ${worksCount} 个作品，无法删除`);
    }

    // 执行删除
    await this.prisma.competition.delete({
      where: { id },
    });

    return { message: '赛事删除成功' };
  }

  async findTracks(competitionId: string, query: TrackQueryDto) {
    const where: any = { competitionId };

    if (query.status) {
      where.status = query.status;
    }

    const tracks = await this.prisma.track.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return tracks;
  }

  async findTrackById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
      include: {
        competition: true,
        resources: {
          where: { isActive: true },
        },
      },
    });

    if (!track) {
      throw new NotFoundException('赛道不存在');
    }

    return track;
  }

  async createTrack(competitionId: string, dto: CreateTrackDto) {
    await this.findOne(competitionId);

    const track = await this.prisma.track.create({
      data: {
        ...dto,
        competitionId,
      },
    });

    return track;
  }

  async updateTrack(id: string, dto: CreateTrackDto) {
    const track = await this.prisma.track.update({
      where: { id },
      data: dto,
    });

    return track;
  }
}
