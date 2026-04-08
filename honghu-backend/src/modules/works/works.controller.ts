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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WorksService } from './works.service';
import {
  CreateWorkDto,
  UpdateWorkDto,
  CreateVersionDto,
  UpdateVersionDto,
  SubmitVersionDto,
  WorkQueryDto,
  AttachmentDto,
} from './dto/works.dto';
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

@ApiTags('Works')
@Controller('api/v1')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post('works')
  @ApiOperation({ summary: '创建作品' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@CurrentUser() user: any, @Body() dto: CreateWorkDto) {
    return this.worksService.create(user.id, dto);
  }

  @Get('works/my')
  @ApiOperation({ summary: '获取我的作品列表' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findMyWorks(@CurrentUser() user: any, @Query() query: WorkQueryDto & PaginationDto) {
    return this.worksService.findMyWorks(user.id, query);
  }

  @Get('works/:id')
  @ApiOperation({ summary: '获取作品详情' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.worksService.findOne(user.id, id);
  }

  @Put('works/:id')
  @ApiOperation({ summary: '更新作品' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateWorkDto) {
    return this.worksService.update(user.id, id, dto);
  }

  @Post('works/:id/versions')
  @ApiOperation({ summary: '创建作品版本' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  createVersion(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: CreateVersionDto) {
    return this.worksService.createVersion(user.id, id, dto);
  }

  @Put('works/:workId/versions/:versionId')
  @ApiOperation({ summary: '更新作品版本' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateVersion(
    @CurrentUser() user: any,
    @Param('workId') workId: string,
    @Param('versionId') versionId: string,
    @Body() dto: UpdateVersionDto,
  ) {
    return this.worksService.updateVersion(user.id, versionId, dto);
  }

  @Post('works/:id/submit')
  @ApiOperation({ summary: '提交作品最终版' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  submitVersion(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: SubmitVersionDto) {
    return this.worksService.submitVersion(user.id, id, dto);
  }

  @Post('versions/:versionId/attachments')
  @ApiOperation({ summary: '添加附件' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  addAttachment(@Param('versionId') versionId: string, @Body() dto: AttachmentDto) {
    return this.worksService.addAttachment(versionId, dto);
  }

  @Delete('attachments/:id')
  @ApiOperation({ summary: '删除附件' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  deleteAttachment(@Param('id') id: string) {
    return this.worksService.deleteAttachment(id);
  }

  @Get('admin/works')
  @ApiOperation({ summary: '获取作品列表（后台）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  adminFindAll(@CurrentUser() user: any, @Query() query: WorkQueryDto & PaginationDto) {
    checkAdminRole(user);
    return this.worksService.adminFindAll(query);
  }
}