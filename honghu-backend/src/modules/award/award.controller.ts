import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AwardService } from './award.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles, Public } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateAwardDto, UpdateAwardDto, AwardWorkDto } from './dto/award.dto';

@ApiTags('Awards')
@Controller('api/v1')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @ApiOperation({ summary: 'Get competition results (public)' })
  @Public()
  @Get('competitions/:competitionId/results')
  getResults(@Param('competitionId', ParseUUIDPipe) competitionId: string) {
    return this.awardService.getCompetitionResults(competitionId);
  }

  @ApiOperation({ summary: 'Get all awards for competition' })
  @Public()
  @Get('competitions/:competitionId/awards')
  findAll(@Param('competitionId', ParseUUIDPipe) competitionId: string) {
    return this.awardService.findAll(competitionId);
  }

  @ApiOperation({ summary: 'Get award details' })
  @Public()
  @Get('awards/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.awardService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @Post('admin/awards')
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @Put('admin/awards/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardService.update(id, updateAwardDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @Delete('admin/awards/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.awardService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @Post('admin/works/:workId/award')
  awardWork(
    @Param('workId', ParseUUIDPipe) workId: string,
    @Body() awardWorkDto: AwardWorkDto,
  ) {
    return this.awardService.awardWork(workId, awardWorkDto);
  }
}
