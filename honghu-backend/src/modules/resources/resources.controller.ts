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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ResourcesService } from './resources.service';
import {
  CreateResourceDto,
  UpdateResourceDto,
  ResourceQueryDto,
} from './dto/resources.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ForbiddenException } from '@nestjs/common';

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

@ApiTags('Resources')
@Controller('api/v1')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('resources')
  @ApiOperation({ summary: '获取资源列表' })
  findAll(@CurrentUser() user: any, @Query() query: ResourceQueryDto & PaginationDto) {
    const userId = user?.id || null;
    return this.resourcesService.findAll(userId, query);
  }

  @Get('resources/:id')
  @ApiOperation({ summary: '获取资源详情' })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    const userId = user?.id || null;
    return this.resourcesService.findOne(userId, id);
  }

  @Post('resources/:id/download')
  @ApiOperation({ summary: '下载资源' })
  async download(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    let userId = user?.id || null;
    const authHeader = req?.headers?.authorization;
    
    if (!userId && authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const decoded = await this.jwtService.verifyAsync(token);
          userId = decoded.sub;
        } catch (e) {
        }
      }
    }
    
    return this.resourcesService.download(userId, id);
  }

  @Get('admin/resources')
  @ApiOperation({ summary: '获取资源列表（后台）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  adminFindAll(@CurrentUser() user: any, @Query() query: ResourceQueryDto & PaginationDto) {
    checkAdminRole(user);
    return this.resourcesService.adminFindAll(query);
  }

  @Post('admin/resources')
  @ApiOperation({ summary: '创建资源（后台）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@CurrentUser() user: any, @Body() dto: CreateResourceDto) {
    checkAdminRole(user);
    return this.resourcesService.adminCreate(dto, user.id);
  }

  @Put('admin/resources/:id')
  @ApiOperation({ summary: '更新资源（后台）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateResourceDto) {
    checkAdminRole(user);
    return this.resourcesService.adminUpdate(id, dto);
  }

  @Delete('admin/resources/:id')
  @ApiOperation({ summary: '删除资源（后台）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  delete(@CurrentUser() user: any, @Param('id') id: string) {
    checkAdminRole(user);
    return this.resourcesService.adminDelete(id);
  }
}