import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateEnrollmentDto, EnrollmentQueryDto, ReviewEnrollmentDto, SubmitEnrollmentDto } from './dto/enrollment.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

const CONTESTANT_ROLES = ['contestant', 'team_leader'];
const ADMIN_ROLES = ['operator', 'super_admin'];
const ENROLLMENT_STATUSES = ['draft', 'submitted', 'pending_review', 'approved', 'rejected', 'need_more_material', 'withdrawn'];

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateEnrollmentDto) {
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

    const existing = await this.prisma.enrollment.findUnique({
      where: {
        userId_competitionId: {
          userId,
          competitionId: dto.competitionId,
        },
      },
    });

    if (existing) {
      throw new ForbiddenException('您已报名过该赛事');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: {
        competitionId: dto.competitionId,
        trackId: dto.trackId,
        userId,
        enrollmentType: dto.enrollmentType || 'individual',
        status: 'draft',
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        extraData: dto.extraData,
      },
      include: {
        competition: true,
        track: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return enrollment;
  }

  async submit(userId: string, enrollmentId: string, dto: SubmitEnrollmentDto) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('报名不存在');
    }

    if (enrollment.userId !== userId) {
      throw new ForbiddenException('无权限操作');
    }

    if (enrollment.status !== 'draft') {
      throw new BadRequestException('只有草稿状态的报名可以提交');
    }

    const updated = await this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'submitted',
        submittedAt: new Date(),
        contactPhone: dto.contactPhone,
        contactEmail: dto.contactEmail,
        extraData: dto.extraData,
      },
      include: {
        competition: true,
        track: true,
      },
    });

    return updated;
  }

  async withdraw(userId: string, enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('报名不存在');
    }

    if (enrollment.userId !== userId) {
      throw new ForbiddenException('无权限操作');
    }

    if (!['draft', 'submitted', 'pending_review'].includes(enrollment.status)) {
      throw new BadRequestException('当前状态不允许撤回');
    }

    const updated = await this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'withdrawn',
      },
    });

    return updated;
  }

  async findMyEnrollments(userId: string, query: EnrollmentQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, status, competitionId } = query;

    const where: any = {
      userId,
    };

    if (status) {
      where.status = status;
    }

    if (competitionId) {
      where.competitionId = competitionId;
    }

    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          competition: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          track: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.enrollment.count({ where }),
    ]);

    return new PaginatedResponse(enrollments, total, page, pageSize);
  }

  async findOne(userId: string, enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        competition: true,
        track: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reviewHistory: {
          orderBy: { createdAt: 'desc' },
          include: {
            reviewer: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('报名不存在');
    }

    return enrollment;
  }

  async adminFindAll(query: EnrollmentQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, sortBy = 'createdAt', sortOrder = 'desc', status, competitionId } = query;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (competitionId) {
      where.competitionId = competitionId;
    }

    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
        include: {
          competition: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          track: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.enrollment.count({ where }),
    ]);

    return new PaginatedResponse(enrollments, total, page, pageSize);
  }

  async adminFindOne(enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        competition: true,
        track: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        reviewHistory: {
          orderBy: { createdAt: 'desc' },
          include: {
            reviewer: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('报名不存在');
    }

    return enrollment;
  }

  async approve(enrollmentId: string, reviewerId: string, comment?: string) {
    return this.review(enrollmentId, reviewerId, 'approved', comment);
  }

  async reject(enrollmentId: string, reviewerId: string, comment?: string) {
    return this.review(enrollmentId, reviewerId, 'rejected', comment);
  }

  async needMoreMaterial(enrollmentId: string, reviewerId: string, comment?: string) {
    return this.review(enrollmentId, reviewerId, 'need_more_material', comment);
  }

  private async review(enrollmentId: string, reviewerId: string, status: string, comment?: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('报名不存在');
    }

    if (!['submitted', 'pending_review'].includes(enrollment.status)) {
      throw new BadRequestException('只有已提交或待审核状态的报名可以审核');
    }

    const [updated] = await Promise.all([
      this.prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
          status,
          reviewedBy: reviewerId,
          reviewedAt: new Date(),
          reviewComment: comment,
        },
      }),
      this.prisma.enrollmentReview.create({
        data: {
          enrollmentId,
          round: enrollment.reviewRound,
          status,
          reviewerId,
          comment,
          reviewedAt: new Date(),
        },
      }),
    ]);

    return updated;
  }
}
