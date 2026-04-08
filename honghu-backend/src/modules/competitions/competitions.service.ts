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

  async create(dto: CreateCompetitionDto, userId: string) {
    const competition = await this.prisma.competition.create({
      data: {
        ...dto,
        createdBy: userId,
      },
    });

    return competition;
  }

  async update(id: string, dto: CreateCompetitionDto) {
    await this.findOne(id);

    const competition = await this.prisma.competition.update({
      where: { id },
      data: dto,
    });

    return competition;
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);

    const competition = await this.prisma.competition.update({
      where: { id },
      data: { status },
    });

    return competition;
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
