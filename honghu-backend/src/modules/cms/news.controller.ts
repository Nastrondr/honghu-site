import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';
import { NewsQueryDto, CreateNewsDto, ExpertQueryDto, CreateExpertDto, PartnerQueryDto, CreatePartnerDto, HomeConfigDto } from './dto/cms.dto';
import { Public, CurrentUser } from '../../common';

const ADMIN_ROLES = ['operator', 'super_admin'];

function checkAdminRole(user: any) {
  if (!user) {
    throw new ForbiddenException('请先登录');
  }
  const hasRole = ADMIN_ROLES.includes(user.currentRole) || 
    (user.roles && user.roles.some((r: string) => ADMIN_ROLES.includes(r)));
  if (!hasRole) {
    throw new ForbiddenException('您没有权限访问此接口');
  }
}

@ApiTags('News')
@Controller('api/v1')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get('news')
  @ApiOperation({ summary: '获取新闻列表（公开）' })
  @ApiResponse({ status: 200, description: '返回新闻分页列表' })
  findAllNews(@Query() query: NewsQueryDto) {
    return this.newsService.findAllNews(query);
  }

  @Public()
  @Get('news/:id')
  @ApiOperation({ summary: '获取新闻详情' })
  @ApiResponse({ status: 200, description: '返回新闻详情' })
  findOneNews(@Param('id') id: string) {
    return this.newsService.findOneNews(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin/news')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建新闻（后台）' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createNews(@Body() dto: CreateNewsDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.createNews(dto, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/news/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新新闻（后台）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateNews(@Param('id') id: string, @Body() dto: CreateNewsDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.updateNews(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/news/:id/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '发布新闻（后台）' })
  @ApiResponse({ status: 200, description: '发布成功' })
  publishNews(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.publishNews(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/news/:id/unpublish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '下线新闻（后台）' })
  @ApiResponse({ status: 200, description: '下线成功' })
  unpublishNews(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.unpublishNews(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/news/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除新闻（后台）' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteNews(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.deleteNews(id);
  }
}

@ApiTags('Experts')
@Controller('api/v1')
export class ExpertController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get('experts')
  @ApiOperation({ summary: '获取专家列表（公开）' })
  @ApiResponse({ status: 200, description: '返回专家分页列表' })
  findAllExperts(@Query() query: ExpertQueryDto) {
    return this.newsService.findAllExperts(query);
  }

  @Public()
  @Get('experts/:id')
  @ApiOperation({ summary: '获取专家详情' })
  @ApiResponse({ status: 200, description: '返回专家详情' })
  findOneExpert(@Param('id') id: string) {
    return this.newsService.findOneExpert(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin/experts')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建专家（后台）' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createExpert(@Body() dto: CreateExpertDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.createExpert(dto, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/experts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新专家（后台）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateExpert(@Param('id') id: string, @Body() dto: CreateExpertDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.updateExpert(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/experts/:id/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '发布专家（后台）' })
  @ApiResponse({ status: 200, description: '发布成功' })
  publishExpert(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.publishExpert(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/experts/:id/unpublish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '下线专家（后台）' })
  @ApiResponse({ status: 200, description: '下线成功' })
  unpublishExpert(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.unpublishExpert(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/experts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除专家（后台）' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deleteExpert(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.deleteExpert(id);
  }
}

@ApiTags('Partners')
@Controller('api/v1')
export class PartnerController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get('partners')
  @ApiOperation({ summary: '获取合作单位列表（公开）' })
  @ApiResponse({ status: 200, description: '返回合作单位分页列表' })
  findAllPartners(@Query() query: PartnerQueryDto) {
    return this.newsService.findAllPartners(query);
  }

  @Public()
  @Get('partners/:id')
  @ApiOperation({ summary: '获取合作单位详情' })
  @ApiResponse({ status: 200, description: '返回合作单位详情' })
  findOnePartner(@Param('id') id: string) {
    return this.newsService.findOnePartner(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin/partners')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建合作单位（后台）' })
  @ApiResponse({ status: 201, description: '创建成功' })
  createPartner(@Body() dto: CreatePartnerDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.createPartner(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/partners/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新合作单位（后台）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updatePartner(@Param('id') id: string, @Body() dto: CreatePartnerDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.updatePartner(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/partners/:id/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '发布合作单位（后台）' })
  @ApiResponse({ status: 200, description: '发布成功' })
  publishPartner(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.publishPartner(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/partners/:id/unpublish')
  @ApiBearerAuth()
  @ApiOperation({ summary: '下线合作单位（后台）' })
  @ApiResponse({ status: 200, description: '下线成功' })
  unpublishPartner(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.unpublishPartner(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/partners/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除合作单位（后台）' })
  @ApiResponse({ status: 200, description: '删除成功' })
  deletePartner(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.deletePartner(id);
  }
}

@ApiTags('Homepage')
@Controller('api/v1')
export class HomeController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get('home/config')
  @ApiOperation({ summary: '获取首页配置（公开）' })
  @ApiResponse({ status: 200, description: '返回首页配置' })
  getHomeConfig() {
    return this.newsService.getHomeConfig();
  }

  @Public()
  @Get('configs')
  @ApiOperation({ summary: '获取公开配置（公开）' })
  @ApiResponse({ status: 200, description: '返回公开配置列表' })
  getPublicConfigs() {
    return this.newsService.getPublicConfigs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/home/config')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新首页配置（后台）' })
  @ApiResponse({ status: 200, description: '更新成功' })
  updateHomeConfig(@Body() dto: HomeConfigDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.newsService.updateHomeConfig(dto, user.id);
  }
}
