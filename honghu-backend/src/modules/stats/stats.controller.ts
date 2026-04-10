import { Controller, Get, UseGuards, Query, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

const prisma = new PrismaClient();

@ApiTags('Stats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('operator', 'super_admin')
@Controller('api/v1/admin/stats')
export class StatsController {
  @ApiOperation({ summary: 'Overview statistics' })
  @Get('overview')
  async getOverview(@Query('competitionId') competitionId?: string) {
    const where = competitionId ? { competitionId } : {};
    const reviewWhere = competitionId ? { round: { competitionId } } : {};

    const [users, competitions, works, enrollments, assignments, submittedReviews] = await Promise.all([
      prisma.user.count(),
      prisma.competition.count(),
      prisma.work.count({ where }),
      prisma.enrollment.count({ where }),
      prisma.reviewAssignment.count({ where: reviewWhere }),
      prisma.reviewRecord.count({ where: { ...reviewWhere, status: 'submitted' } }),
    ]);

    return {
      users,
      competitions,
      works,
      enrollments,
      assignments,
      submittedReviews,
    };
  }

  @ApiOperation({ summary: 'Works statistics' })
  @Get('works')
  async getWorksStats(@Query('competitionId') competitionId?: string) {
    const where = competitionId ? { competitionId } : {};
    const trackWhere = competitionId ? { competitionId } : {};

    const [total, byStatus, byTrack] = await Promise.all([
      prisma.work.count({ where }),
      prisma.work.groupBy({
        by: ['status'],
        where,
        _count: { status: true },
      }),
      prisma.track.findMany({
        where: trackWhere,
        select: {
          id: true,
          name: true,
          _count: {
            select: { works: true },
          },
        },
      }),
    ]);

    const statusStats = byStatus.map(s => ({
      status: s.status,
      count: s._count.status,
    }));

    const trackStats = byTrack.map(t => ({
      trackId: t.id,
      trackName: t.name,
      count: t._count.works,
    }));

    return {
      total,
      byStatus: statusStats,
      byTrack: trackStats,
    };
  }

  @ApiOperation({ summary: 'Reviews statistics' })
  @Get('reviews')
  async getReviewsStats(@Query('competitionId') competitionId?: string) {
    const reviewWhere = competitionId ? { round: { competitionId } } : {};

    const [totalAssignments, byStatus, submittedCount, totalRounds] = await Promise.all([
      prisma.reviewAssignment.count({ where: reviewWhere }),
      prisma.reviewAssignment.groupBy({
        by: ['status'],
        where: reviewWhere,
        _count: { status: true },
      }),
      prisma.reviewRecord.count({
        where: { ...reviewWhere, status: 'submitted' },
      }),
      prisma.reviewRound.count({ 
        where: competitionId ? { competitionId } : {} 
      }),
    ]);

    const avgScore = await prisma.reviewRecord.aggregate({
      where: {
        ...reviewWhere,
        status: 'submitted',
      },
      _avg: { overallScore: true },
    });

    return {
      totalRounds,
      totalAssignments,
      submitted: submittedCount,
      pending: totalAssignments - submittedCount,
      byStatus: byStatus.map(s => ({
        status: s.status,
        count: s._count.status,
      })),
      avgScore: avgScore._avg.overallScore || 0,
    };
  }

  @ApiOperation({ summary: 'Enrollment statistics' })
  @Get('enrollments')
  async getEnrollmentStats(@Query('competitionId') competitionId?: string) {
    const where = competitionId ? { competitionId } : {};

    const [total, byStatus] = await Promise.all([
      prisma.enrollment.count({ where }),
      prisma.enrollment.groupBy({
        by: ['status'],
        where,
        _count: { status: true },
      }),
    ]);

    const statusStats = byStatus.map(s => ({
      status: s.status,
      count: s._count.status,
    }));

    return {
      total,
      byStatus: statusStats,
    };
  }

  @ApiOperation({ summary: 'Awards statistics' })
  @Get('awards')
  async getAwardsStats(@Query('competitionId') competitionId?: string) {
    const where = competitionId ? { competitionId } : {};
    const workWhere = competitionId ? { competitionId, awardId: { not: null } } : { awardId: { not: null } };
    
    const [totalAwards, awardedWorks] = await Promise.all([
      prisma.award.count({ where }),
      prisma.work.count({ where: workWhere }),
    ]);

    const byLevel = await prisma.award.groupBy({
      by: ['awardLevel'],
      where: { competitionId },
      _count: { awardLevel: true },
    });

    const worksWithAwards = await prisma.work.findMany({
      where: { competitionId, awardId: { not: null } },
      select: {
        id: true,
        title: true,
        rank: true,
        totalScore: true,
        award: {
          select: {
            awardName: true,
            awardLevel: true,
          },
        },
      },
      orderBy: { rank: 'asc' },
    });

    return {
      totalAwards,
      awardedWorks,
      byLevel: byLevel.map(l => ({
        level: l.awardLevel,
        count: l._count.awardLevel,
      })),
      worksWithAwards,
    };
  }
}
