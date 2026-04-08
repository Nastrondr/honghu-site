import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createRound(userId: string, dto: CreateRoundDto) {
    const competition = await this.prisma.competition.findUnique({
      where: { id: dto.competitionId },
    });

    if (!competition) {
      throw new NotFoundException('赛事不存在');
    }

    const template = await this.prisma.reviewTemplate.findUnique({
      where: { id: dto.templateId },
    });

    if (!template) {
      throw new NotFoundException('评分模板不存在');
    }

    if (dto.trackId) {
      const track = await this.prisma.track.findUnique({
        where: { id: dto.trackId },
      });
      if (!track || track.competitionId !== dto.competitionId) {
        throw new NotFoundException('赛道不存在');
      }
    }

    const round = await this.prisma.reviewRound.create({
      data: {
        competitionId: dto.competitionId,
        trackId: dto.trackId,
        roundName: dto.roundName,
        roundType: dto.roundType,
        roundOrder: dto.roundOrder,
        templateId: dto.templateId,
        workFilterSql: dto.workFilterSql,
        minScoreThreshold: dto.minScoreThreshold,
        passingCount: dto.passingCount,
        status: 'pending',
        startTime: dto.startTime,
        endTime: dto.endTime,
        createdBy: userId,
      },
    });

    return round;
  }

  async findRounds(competitionId: string) {
    return this.prisma.reviewRound.findMany({
      where: { competitionId },
      orderBy: { roundOrder: 'asc' },
      include: {
        competition: { select: { id: true, name: true } },
        track: { select: { id: true, name: true } },
      },
    });
  }

  async assignWorks(userId: string, roundId: string, dto: AssignWorksDto) {
    const round = await this.prisma.reviewRound.findUnique({
      where: { id: roundId },
    });

    if (!round) {
      throw new NotFoundException('评审轮次不存在');
    }

    if (round.status !== 'pending' && round.status !== 'active') {
      throw new BadRequestException('当前轮次状态不允许分配作品');
    }

    const assignments = [];

    for (const item of dto.assignments) {
      const work = await this.prisma.work.findUnique({
        where: { id: item.workId },
      });

      if (!work || work.competitionId !== round.competitionId) {
        continue;
      }

      const reviewer = await this.prisma.user.findUnique({
        where: { id: item.reviewerId },
      });

      if (!reviewer) {
        continue;
      }

      const existing = await this.prisma.reviewAssignment.findFirst({
        where: {
          roundId,
          workId: item.workId,
          reviewerId: item.reviewerId,
        },
      });

      if (existing) {
        continue;
      }

      const assignment = await this.prisma.reviewAssignment.create({
        data: {
          roundId,
          workId: item.workId,
          reviewerId: item.reviewerId,
          assignmentType: item.assignmentType || 'manual',
          assignedBy: userId,
          dueDate: item.dueDate,
        },
      });

      assignments.push(assignment);
    }

    return assignments;
  }

  async findAssignments(roundId: string) {
    return this.prisma.reviewAssignment.findMany({
      where: { roundId },
      include: {
        work: { select: { id: true, title: true, team: { select: { id: true, name: true } }, user: { select: { id: true, username: true } } } },
        reviewer: { select: { id: true, username: true, email: true } },
        record: { select: { id: true, overallScore: true, status: true, submittedAt: true } },
      },
    });
  }

  async findMyAssignedWorks(reviewerId: string) {
    return this.prisma.reviewAssignment.findMany({
      where: { reviewerId },
      include: {
        work: {
          include: {
            competition: { select: { id: true, name: true } },
            track: { select: { id: true, name: true } },
            team: { select: { id: true, name: true } },
            user: { select: { id: true, username: true } },
            versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
          },
        },
        round: { select: { id: true, roundName: true, roundType: true, endTime: true } },
        record: { select: { id: true, overallScore: true, status: true, submittedAt: true } },
      },
    });
  }

  async findWorkForReview(reviewerId: string, workId: string) {
    const assignment = await this.prisma.reviewAssignment.findFirst({
      where: { workId, reviewerId },
      include: {
        work: {
          include: {
            competition: { select: { id: true, name: true } },
            track: { select: { id: true, name: true } },
            team: { select: { id: true, name: true } },
            user: { select: { id: true, username: true } },
            versions: { orderBy: { versionNumber: 'desc' }, take: 5 },
            attachments: { take: 10 },
          },
        },
        round: true,
        record: { include: { scores: true } },
      },
    });

    if (!assignment) {
      throw new ForbiddenException('您没有权限评审此作品');
    }

    return assignment;
  }

  async submitScore(reviewerId: string, assignmentId: string, dto: SubmitScoreDto) {
    const assignment = await this.prisma.reviewAssignment.findUnique({
      where: { id: assignmentId },
      include: { round: true },
    });

    if (!assignment) {
      throw new NotFoundException('分配记录不存在');
    }

    if (assignment.reviewerId !== reviewerId) {
      throw new ForbiddenException('您不是此作品的评委');
    }

    if (assignment.round.status === 'completed') {
      throw new BadRequestException('评审轮次已结束');
    }

    let record = await this.prisma.reviewRecord.findUnique({
      where: { assignmentId },
    });

    if (!record) {
      record = await this.prisma.reviewRecord.create({
        data: {
          assignmentId,
          roundId: assignment.roundId,
          workId: assignment.workId,
          reviewerId,
          status: dto.isDraft ? 'draft' : 'submitted',
          overallScore: dto.overallScore,
          overallComment: dto.overallComment,
          recommendation: dto.recommendation,
          submittedAt: dto.isDraft ? null : new Date(),
        },
      });
    } else {
      record = await this.prisma.reviewRecord.update({
        where: { id: record.id },
        data: {
          status: dto.isDraft ? 'draft' : 'submitted',
          overallScore: dto.overallScore,
          overallComment: dto.overallComment,
          recommendation: dto.recommendation,
          submittedAt: dto.isDraft && record.status === 'draft' ? null : new Date(),
        },
      });
    }

    if (!dto.isDraft && dto.criterionScores) {
      await this.prisma.reviewScoreDetail.deleteMany({
        where: { reviewRecordId: record.id },
      });

      for (const cs of dto.criterionScores) {
        await this.prisma.reviewScoreDetail.create({
          data: {
            reviewRecordId: record.id,
            criterionId: cs.criterionId,
            score: cs.score,
            comment: cs.comment,
          },
        });
      }

      if (assignment.round.status === 'pending') {
        await this.prisma.reviewRound.update({
          where: { id: assignment.roundId },
          data: { status: 'active' },
        });
      }
    }

    return record;
  }

  async findReviewProgress(roundId: string) {
    const assignments = await this.prisma.reviewAssignment.findMany({
      where: { roundId },
      include: {
        work: { select: { id: true, title: true } },
        record: { select: { id: true, status: true, overallScore: true } },
      },
    });

    const total = assignments.length;
    const submitted = assignments.filter((a: any) => a.record?.status === 'submitted').length;
    const draft = assignments.filter((a: any) => a.record?.status === 'draft').length;
    const pending = total - submitted - draft;

    return { total, submitted, draft, pending, assignments };
  }
}

export class CreateRoundDto {
  competitionId: string;
  trackId?: string;
  roundName: string;
  roundType: string;
  roundOrder: number;
  templateId: string;
  workFilterSql?: string;
  minScoreThreshold?: number;
  passingCount?: number;
  startTime?: Date;
  endTime?: Date;
}

export class AssignWorksDto {
  assignments: {
    workId: string;
    reviewerId: string;
    assignmentType?: string;
    dueDate?: Date;
  }[];
}

export class SubmitScoreDto {
  overallScore?: number;
  overallComment?: string;
  recommendation?: string;
  isDraft: boolean;
  criterionScores?: {
    criterionId: string;
    score?: number;
    comment?: string;
  }[];
}
