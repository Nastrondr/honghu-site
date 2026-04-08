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
@Roles('admin', 'super_admin')
@Controller('api/v1/admin/stats')
export class StatsController {
  @ApiOperation({ summary: 'Overview statistics' })
  @Get('overview')
  async getOverview(@Query('competitionId') competitionId?: string) {
    const where = competitionId ? { competitionId } : {};

    const [users, competitions, works, assignments] = await Promise.all([
      prisma.user.count(),
      prisma.competition.count(),
      prisma.work.count({ where }),
      prisma.reviewAssignment.count({ where: competitionId ? { round: { competitionId } } : {} }),
    ]);

    return {
      users,
      competitions,
      works,
      assignments,
    };
  }

  @ApiOperation({ summary: 'Works statistics by competition' })
  @Get('works')
  async getWorksStats(@Query('competitionId', ParseUUIDPipe) competitionId: string) {
    const [total, byStatus, byTrack] = await Promise.all([
      prisma.work.count({ where: { competitionId } }),
      prisma.work.groupBy({
        by: ['status'],
        where: { competitionId },
        _count: { status: true },
      }),
      prisma.work.groupBy({
        by: ['trackId'],
        where: { competitionId },
        _count: { trackId: true },
      }),
    ]);

    const statusStats = byStatus.map(s => ({
      status: s.status,
      count: s._count.status,
    }));

    const trackStats = await Promise.all(
      byTrack.map(async t => {
        const track = await prisma.track.findUnique({ where: { id: t.trackId } });
        return {
          trackId: t.trackId,
          trackName: track?.name || 'Unknown',
          count: t._count.trackId,
        };
      }),
    );

    return {
      total,
      byStatus: statusStats,
      byTrack: trackStats,
    };
  }

  @ApiOperation({ summary: 'Reviews statistics by competition' })
  @Get('reviews')
  async getReviewsStats(@Query('competitionId', ParseUUIDPipe) competitionId: string) {
    const [total, byStatus] = await Promise.all([
      prisma.reviewAssignment.count({
        where: { round: { competitionId } },
      }),
      prisma.reviewAssignment.groupBy({
        by: ['status'],
        where: { round: { competitionId } },
        _count: { status: true },
      }),
    ]);

    const submitted = await prisma.reviewRecord.count({
      where: {
        assignment: { round: { competitionId } },
        status: 'submitted',
      },
    });

    const avgScore = await prisma.reviewRecord.aggregate({
      where: {
        assignment: { round: { competitionId } },
        status: 'submitted',
      },
      _avg: { overallScore: true },
    });

    return {
      total,
      submitted,
      byStatus: byStatus.map(s => ({
        status: s.status,
        count: s._count.status,
      })),
      avgScore: avgScore._avg.overallScore || 0,
    };
  }

  @ApiOperation({ summary: 'Awards statistics by competition' })
  @Get('awards')
  async getAwardsStats(@Query('competitionId', ParseUUIDPipe) competitionId: string) {
    const [totalAwards, awardedWorks] = await Promise.all([
      prisma.award.count({ where: { competitionId } }),
      prisma.work.count({ where: { competitionId, awardId: { not: null } } }),
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
