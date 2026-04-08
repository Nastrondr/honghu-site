import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNotificationDto, BatchCreateNotificationDto, QueryNotificationDto } from './dto/notification.dto';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
  async findAll(userId: string, query: QueryNotificationDto) {
    const { page = 1, pageSize = 20, isRead, type } = query;
    const skip = (page - 1) * pageSize;

    const where: any = { userId };
    if (isRead !== undefined) {
      where.isRead = isRead;
    }
    if (type) {
      where.type = type;
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      list: notifications,
      total,
      page,
      pageSize,
    };
  }

  async getUnreadCount(userId: string) {
    const count = await prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  async markAsRead(id: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    return { success: true };
  }

  async create(createNotificationDto: CreateNotificationDto) {
    return prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async createBatch(batchDto: BatchCreateNotificationDto) {
    const { userIds, ...rest } = batchDto;
    const data = userIds.map(userId => ({
      ...rest,
      userId,
    }));

    return prisma.notification.createMany({
      data,
    });
  }
}
