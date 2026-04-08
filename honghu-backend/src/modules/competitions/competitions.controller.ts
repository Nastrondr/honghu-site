import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CompetitionsService } from './competitions.service';
import {
  CompetitionQueryDto,
  CreateCompetitionDto,
  CreateTrackDto,
} from './dto/competitions.dto';
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

@ApiTags('Competitions')
@Controller('api/v1')
export class CompetitionsController {
  constructor(private competitionsService: CompetitionsService) {}

  @Public()
  @Get('competitions')
  @ApiOperation({ summary: '获取赛事列表（公开）' })
  findAll(@Query() query: CompetitionQueryDto) {
    return this.competitionsService.findAll(query);
  }

  @Public()
  @Get('competitions/:id')
  @ApiOperation({ summary: '获取赛事详情' })
  findOne(@Param('id') id: string) {
    return this.competitionsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin/competitions')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建赛事（后台）' })
  create(@Body() dto: CreateCompetitionDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.competitionsService.create(dto, user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/competitions/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新赛事（后台）' })
  update(@Param('id') id: string, @Body() dto: CreateCompetitionDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.competitionsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/competitions/:id/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改赛事状态（后台）' })
  updateStatus(@Param('id') id: string, @Body() dto: { status: string }, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.competitionsService.updateStatus(id, dto.status);
  }

  @Public()
  @Get('competitions/:competitionId/tracks')
  @ApiOperation({ summary: '获取赛道列表' })
  findTracks(
    @Param('competitionId') competitionId: string,
    @Query() query: any,
  ) {
    return this.competitionsService.findTracks(competitionId, query);
  }

  @Public()
  @Get('tracks/:id')
  @ApiOperation({ summary: '获取赛道详情' })
  findTrackById(@Param('id') id: string) {
    return this.competitionsService.findTrackById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin/competitions/:competitionId/tracks')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建赛道（后台）' })
  createTrack(
    @Param('competitionId') competitionId: string,
    @Body() dto: CreateTrackDto,
    @CurrentUser() user: any,
  ) {
    checkAdminRole(user);
    return this.competitionsService.createTrack(competitionId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('admin/tracks/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新赛道（后台）' })
  updateTrack(@Param('id') id: string, @Body() dto: CreateTrackDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.competitionsService.updateTrack(id, dto);
  }
}
