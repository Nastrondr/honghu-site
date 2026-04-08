import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';
import {
  NewsQueryDto,
  CreateNewsDto,
  ExpertQueryDto,
  CreateExpertDto,
  PartnerQueryDto,
  CreatePartnerDto,
  HomeConfigDto,
  SystemConfigDto,
} from './dto/cms.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAllNews(query: NewsQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, sortBy = 'publishedAt', sortOrder = 'desc', newsType, isFeatured, keyword, isPublished } = query;

    const where: any = {};

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    } else {
      where.isPublished = true;
    }

    if (newsType) {
      where.newsType = newsType;
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { summary: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const [news, total] = await Promise.all([
      this.prisma.news.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.news.count({ where }),
    ]);

    return new PaginatedResponse(news, total, page, pageSize);
  }

  async findOneNews(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('新闻不存在');
    }

    await this.prisma.news.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return news;
  }

  async createNews(dto: CreateNewsDto, userId: string) {
    const existingNews = await this.prisma.news.findUnique({
      where: { slug: dto.slug },
    });

    if (existingNews) {
      throw new ForbiddenException('slug 已存在');
    }

    const news = await this.prisma.news.create({
      data: {
        ...dto,
        createdBy: userId,
      },
    });

    return news;
  }

  async updateNews(id: string, dto: CreateNewsDto) {
    await this.findOneNews(id);

    const news = await this.prisma.news.update({
      where: { id },
      data: dto,
    });

    return news;
  }

  async publishNews(id: string) {
    await this.findOneNews(id);

    const news = await this.prisma.news.update({
      where: { id },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    return news;
  }

  async unpublishNews(id: string) {
    await this.findOneNews(id);

    const news = await this.prisma.news.update({
      where: { id },
      data: {
        isPublished: false,
      },
    });

    return news;
  }

  async deleteNews(id: string) {
    await this.findOneNews(id);

    await this.prisma.news.delete({
      where: { id },
    });

    return { success: true };
  }

  async findAllExperts(query: ExpertQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, sortBy = 'displayOrder', sortOrder = 'asc', expertise, isPublished } = query;

    const where: any = {};

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    } else {
      where.isPublished = true;
    }

    if (expertise) {
      where.expertise = { contains: expertise, mode: 'insensitive' };
    }

    const [experts, total] = await Promise.all([
      this.prisma.expert.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.expert.count({ where }),
    ]);

    return new PaginatedResponse(experts, total, page, pageSize);
  }

  async findOneExpert(id: string) {
    const expert = await this.prisma.expert.findUnique({
      where: { id },
    });

    if (!expert) {
      throw new NotFoundException('专家不存在');
    }

    return expert;
  }

  async createExpert(dto: CreateExpertDto, userId: string) {
    const expert = await this.prisma.expert.create({
      data: {
        ...dto,
        createdBy: userId,
      },
    });

    return expert;
  }

  async updateExpert(id: string, dto: CreateExpertDto) {
    await this.findOneExpert(id);

    const expert = await this.prisma.expert.update({
      where: { id },
      data: dto,
    });

    return expert;
  }

  async publishExpert(id: string) {
    await this.findOneExpert(id);

    const expert = await this.prisma.expert.update({
      where: { id },
      data: { isPublished: true },
    });

    return expert;
  }

  async unpublishExpert(id: string) {
    await this.findOneExpert(id);

    const expert = await this.prisma.expert.update({
      where: { id },
      data: { isPublished: false },
    });

    return expert;
  }

  async deleteExpert(id: string) {
    await this.findOneExpert(id);

    await this.prisma.expert.delete({
      where: { id },
    });

    return { success: true };
  }

  async findAllPartners(query: PartnerQueryDto & PaginationDto) {
    const { page = 1, pageSize = 20, sortBy = 'displayOrder', sortOrder = 'asc', partnerType, isPublished } = query;

    const where: any = {};

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    } else {
      where.isPublished = true;
    }

    if (partnerType) {
      where.partnerType = partnerType;
    }

    const [partners, total] = await Promise.all([
      this.prisma.partner.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.partner.count({ where }),
    ]);

    return new PaginatedResponse(partners, total, page, pageSize);
  }

  async findOnePartner(id: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new NotFoundException('合作单位不存在');
    }

    return partner;
  }

  async createPartner(dto: CreatePartnerDto) {
    const partner = await this.prisma.partner.create({
      data: dto,
    });

    return partner;
  }

  async updatePartner(id: string, dto: CreatePartnerDto) {
    await this.findOnePartner(id);

    const partner = await this.prisma.partner.update({
      where: { id },
      data: dto,
    });

    return partner;
  }

  async publishPartner(id: string) {
    await this.findOnePartner(id);

    const partner = await this.prisma.partner.update({
      where: { id },
      data: { isPublished: true },
    });

    return partner;
  }

  async unpublishPartner(id: string) {
    await this.findOnePartner(id);

    const partner = await this.prisma.partner.update({
      where: { id },
      data: { isPublished: false },
    });

    return partner;
  }

  async deletePartner(id: string) {
    await this.findOnePartner(id);

    await this.prisma.partner.delete({
      where: { id },
    });

    return { success: true };
  }

  async getHomeConfig() {
    const configs = await this.prisma.systemConfig.findMany({
      where: {
        OR: [
          { configGroup: 'homepage', isPublic: true },
          { configKey: { startsWith: 'homepage_' } },
        ],
      },
    });

    const configMap: Record<string, string> = {};
    for (const config of configs) {
      configMap[config.configKey] = config.configValue || '';
    }

    return {
      heroTitle: configMap['homepage_hero_title'] || '梧桐·鸿鹄人工智能应用创新大赛',
      heroSubtitle: configMap['homepage_hero_subtitle'] || '汇聚AI精英，共创未来',
      heroImage: configMap['homepage_hero_image'] || '',
      featuredCompetitions: configMap['homepage_featured_competitions'] || '',
      latestNews: configMap['homepage_latest_news'] || '',
      contactEmail: configMap['homepage_contact_email'] || '',
      contactPhone: configMap['homepage_contact_phone'] || '',
    };
  }

  async updateHomeConfig(dto: HomeConfigDto, userId: string) {
    const configKeys = [
      'homepage_hero_title',
      'homepage_hero_subtitle',
      'homepage_hero_image',
      'homepage_featured_competitions',
      'homepage_latest_news',
      'homepage_contact_email',
      'homepage_contact_phone',
    ];

    for (const key of configKeys) {
      const value = dto[key as keyof HomeConfigDto];
      if (value !== undefined) {
        await this.prisma.systemConfig.upsert({
          where: { configKey: key },
          create: {
            configKey: key,
            configValue: value,
            configGroup: 'homepage',
            isPublic: true,
            createdBy: userId,
            updatedBy: userId,
          },
          update: {
            configValue: value,
            updatedBy: userId,
          },
        });
      }
    }

    return this.getHomeConfig();
  }

  async getPublicConfigs() {
    const configs = await this.prisma.systemConfig.findMany({
      where: { isPublic: true },
    });

    const configMap: Record<string, string> = {};
    for (const config of configs) {
      configMap[config.configKey] = config.configValue || '';
    }

    return configMap;
  }
}
