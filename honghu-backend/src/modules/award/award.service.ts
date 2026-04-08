import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAwardDto, UpdateAwardDto, AwardWorkDto } from './dto/award.dto';

const prisma = new PrismaClient();

@Injectable()
export class AwardService {
  async create(createAwardDto: CreateAwardDto) {
    return prisma.award.create({
      data: {
        competitionId: createAwardDto.competitionId,
        trackId: createAwardDto.trackId,
        awardName: createAwardDto.awardName,
        awardLevel: createAwardDto.awardLevel,
        awardDescription: createAwardDto.awardDescription,
        prizeAmount: createAwardDto.prizeAmount,
        prizeDetail: createAwardDto.prizeDetail,
        displayOrder: createAwardDto.displayOrder || 0,
      },
    });
  }

  async findAll(competitionId: string) {
    return prisma.award.findMany({
      where: { competitionId },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
      include: {
        works: {
          select: {
            id: true,
            title: true,
            rank: true,
            totalScore: true,
          },
          orderBy: { rank: 'asc' },
        },
      },
    });
  }

  async findOne(id: string) {
    const award = await prisma.award.findUnique({
      where: { id },
      include: {
        competition: { select: { id: true, name: true } },
        works: {
          select: {
            id: true,
            title: true,
            rank: true,
            totalScore: true,
          },
          orderBy: { rank: 'asc' },
        },
      },
    });

    if (!award) {
      throw new NotFoundException('Award not found');
    }

    return award;
  }

  async update(id: string, updateAwardDto: UpdateAwardDto) {
    return prisma.award.update({
      where: { id },
      data: updateAwardDto,
    });
  }

  async remove(id: string) {
    await prisma.award.delete({ where: { id } });
    return { success: true };
  }

  async awardWork(workId: string, awardWorkDto: AwardWorkDto) {
    const work = await prisma.work.findUnique({
      where: { id: workId },
      include: { award: true },
    });

    const updated = await prisma.work.update({
      where: { id: workId },
      data: {
        awardId: awardWorkDto.awardId,
        rank: awardWorkDto.rank,
      },
      include: {
        award: true,
      },
    });

    if (!work!.userId) {
      return updated;
    }

    await prisma.notification.create({
      data: {
        userId: work!.userId,
        type: 'work_awarded',
        title: '恭喜！您的作品获奖',
        content: `您的作品"${work!.title}"在本次大赛中${work!.award ? `获得${work!.award.awardName}` : '取得名次'}`,
        linkType: 'work',
        linkId: workId,
      },
    });

    return updated;
  }

  async getCompetitionResults(competitionId: string) {
    const works = await prisma.work.findMany({
      where: {
        competitionId,
        status: 'submitted',
      },
      select: {
        id: true,
        title: true,
        rank: true,
        totalScore: true,
        awardId: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        award: {
          select: {
            id: true,
            awardName: true,
            awardLevel: true,
            prizeAmount: true,
          },
        },
      },
      orderBy: [{ rank: 'asc' }, { totalScore: 'desc' }],
    });

    const awards = await prisma.award.findMany({
      where: { competitionId },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return {
      works,
      awards,
    };
  }
}
