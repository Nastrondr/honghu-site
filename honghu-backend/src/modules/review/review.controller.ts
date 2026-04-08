import { Controller, Get, Post, Body, Param, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsOptional, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateRoundDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competitionId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  trackId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roundName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roundType!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  roundOrder!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  templateId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  workFilterSql?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minScoreThreshold?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  passingCount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  endTime?: Date;
}

class AssignmentItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reviewerId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignmentType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dueDate?: Date;
}

class AssignWorksDto {
  @ApiProperty({ type: [AssignmentItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentItemDto)
  assignments!: AssignmentItemDto[];
}

class CriterionScoreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  criterionId!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

class SubmitScoreDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  overallScore?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  overallComment?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recommendation?: string;

  @ApiProperty()
  @IsBoolean()
  isDraft!: boolean;

  @ApiProperty({ required: false, type: [CriterionScoreDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriterionScoreDto)
  criterionScores?: CriterionScoreDto[];
}

class RoundQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competitionId!: string;
}

@ApiTags('Review')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/v1')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('admin/review-rounds')
  @Roles('operator', 'super_admin')
  @ApiOperation({ summary: '创建评审轮次' })
  async createRound(@Request() req: any, @Body() dto: CreateRoundDto) {
    return this.reviewService.createRound(req.user.id, dto);
  }

  @Get('admin/review-rounds')
  @Roles('operator', 'super_admin')
  @ApiOperation({ summary: '查看赛事评审轮次列表' })
  async findRounds(@Body() dto: RoundQueryDto) {
    return this.reviewService.findRounds(dto.competitionId);
  }

  @Post('admin/review-rounds/:roundId/assignments')
  @Roles('operator', 'super_admin')
  @ApiOperation({ summary: '给作品分配评委' })
  async assignWorks(
    @Request() req: any,
    @Param('roundId', ParseUUIDPipe) roundId: string,
    @Body() dto: AssignWorksDto,
  ) {
    return this.reviewService.assignWorks(req.user.id, roundId, dto);
  }

  @Get('admin/review-rounds/:roundId/assignments')
  @Roles('operator', 'super_admin')
  @ApiOperation({ summary: '查看评审分配情况' })
  async findAssignments(@Param('roundId', ParseUUIDPipe) roundId: string) {
    return this.reviewService.findAssignments(roundId);
  }

  @Get('admin/review-rounds/:roundId/progress')
  @Roles('operator', 'super_admin')
  @ApiOperation({ summary: '查看评审进度' })
  async findReviewProgress(@Param('roundId', ParseUUIDPipe) roundId: string) {
    return this.reviewService.findReviewProgress(roundId);
  }

  @Get('reviewer/works')
  @Roles('reviewer')
  @ApiOperation({ summary: '获取我的待评作品列表' })
  async findMyAssignedWorks(@Request() req: any) {
    return this.reviewService.findMyAssignedWorks(req.user.id);
  }

  @Get('reviewer/works/:workId')
  @Roles('reviewer')
  @ApiOperation({ summary: '获取作品评审详情' })
  async findWorkForReview(
    @Request() req: any,
    @Param('workId', ParseUUIDPipe) workId: string,
  ) {
    return this.reviewService.findWorkForReview(req.user.id, workId);
  }

  @Post('reviewer/assignments/:assignmentId/score')
  @Roles('reviewer')
  @ApiOperation({ summary: '提交评分' })
  async submitScore(
    @Request() req: any,
    @Param('assignmentId', ParseUUIDPipe) assignmentId: string,
    @Body() dto: SubmitScoreDto,
  ) {
    return this.reviewService.submitScore(req.user.id, assignmentId, dto);
  }
}
