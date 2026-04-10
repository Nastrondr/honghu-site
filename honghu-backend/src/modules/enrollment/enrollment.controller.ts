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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto, EnrollmentQueryDto, ReviewEnrollmentDto, SubmitEnrollmentDto } from './dto/enrollment.dto';
import { Public, CurrentUser } from '../../common';

const CONTESTANT_ROLES = ['contestant', 'team_leader'];
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

@ApiTags('Enrollments')
@Controller('api/v1')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('enrollments')
  @ApiBearerAuth()
  @ApiOperation({ summary: '发起报名（参赛者/队长）' })
  @ApiResponse({ status: 201, description: '创建报名成功' })
  async create(@Body() dto: CreateEnrollmentDto, @CurrentUser() user: any) {
    const eligibility = await this.enrollmentService.checkEligibility(user.id);
    if (!eligibility.eligible) {
      throw new ForbiddenException(eligibility.reason);
    }
    return this.enrollmentService.create(user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('enrollments/:id/submit')
  @ApiBearerAuth()
  @ApiOperation({ summary: '提交报名' })
  @ApiResponse({ status: 200, description: '提交成功' })
  async submit(@Param('id') id: string, @Body() dto: SubmitEnrollmentDto, @CurrentUser() user: any) {
    const eligibility = await this.enrollmentService.checkEligibility(user.id);
    if (!eligibility.eligible) {
      throw new ForbiddenException(eligibility.reason);
    }
    return this.enrollmentService.submit(user.id, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('enrollments/:id/withdraw')
  @ApiBearerAuth()
  @ApiOperation({ summary: '撤回报名' })
  @ApiResponse({ status: 200, description: '撤回成功' })
  async withdraw(@Param('id') id: string, @CurrentUser() user: any) {
    const eligibility = await this.enrollmentService.checkEligibility(user.id);
    if (!eligibility.eligible) {
      throw new ForbiddenException(eligibility.reason);
    }
    return this.enrollmentService.withdraw(user.id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('enrollments')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取我的报名列表' })
  @ApiResponse({ status: 200, description: '返回报名列表' })
  findMyEnrollments(@Query() query: EnrollmentQueryDto, @CurrentUser() user: any) {
    return this.enrollmentService.findMyEnrollments(user.id, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('enrollments/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取报名详情' })
  @ApiResponse({ status: 200, description: '返回报名详情' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.enrollmentService.findOne(user.id, id);
  }
}

@ApiTags('Admin-Enrollments')
@Controller('api/v1/admin/enrollments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AdminEnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  @ApiOperation({ summary: '获取报名列表（后台）' })
  @ApiResponse({ status: 200, description: '返回报名列表' })
  findAll(@Query() query: EnrollmentQueryDto, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.enrollmentService.adminFindAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取报名详情（后台）' })
  @ApiResponse({ status: 200, description: '返回报名详情' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    checkAdminRole(user);
    return this.enrollmentService.adminFindOne(id);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: '审核通过（后台）' })
  @ApiResponse({ status: 200, description: '审核通过' })
  approve(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: ReviewEnrollmentDto) {
    checkAdminRole(user);
    return this.enrollmentService.approve(id, user.id, dto.comment);
  }

  @Put(':id/reject')
  @ApiOperation({ summary: '审核驳回（后台）' })
  @ApiResponse({ status: 200, description: '审核驳回' })
  reject(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: ReviewEnrollmentDto) {
    checkAdminRole(user);
    return this.enrollmentService.reject(id, user.id, dto.comment);
  }

  @Put(':id/need-more-material')
  @ApiOperation({ summary: '要求补件（后台）' })
  @ApiResponse({ status: 200, description: '已要求补件' })
  needMoreMaterial(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: ReviewEnrollmentDto) {
    checkAdminRole(user);
    return this.enrollmentService.needMoreMaterial(id, user.id, dto.comment);
  }
}
