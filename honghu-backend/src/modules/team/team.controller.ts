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
import { TeamService } from './team.service';
import {
  CreateTeamDto,
  UpdateTeamDto,
  TeamQueryDto,
  InviteMemberDto,
  InviteByEmailDto,
  RespondInvitationDto,
  RemoveMemberDto,
  TransferCaptainDto,
  JoinTeamDto,
} from './dto/team.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Teams')
@Controller('api/v1/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: '创建团队' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@CurrentUser() user: any, @Body() dto: CreateTeamDto) {
    return this.teamService.create(user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取团队详情' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.teamService.findOne(user.id, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新团队信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamService.update(user.id, id, dto);
  }

  @Post(':id/invite')
  @ApiOperation({ summary: '邀请成员（按用户ID）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  inviteMember(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.teamService.inviteMember(user.id, id, dto);
  }

  @Post(':id/invite/email')
  @ApiOperation({ summary: '邀请成员（按邮箱）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  inviteByEmail(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: InviteByEmailDto) {
    return this.teamService.inviteByEmail(user.id, id, dto);
  }

  @Post(':id/accept-invitation')
  @ApiOperation({ summary: '接受邀请' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  acceptInvitation(@CurrentUser() user: any, @Param('id') id: string) {
    return this.teamService.acceptInvitation(user.id, id);
  }

  @Post(':id/reject-invitation')
  @ApiOperation({ summary: '拒绝邀请' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  rejectInvitation(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { comment?: string },
  ) {
    return this.teamService.rejectInvitation(user.id, id, body.comment);
  }

  @Post(':id/invitations/respond')
  @ApiOperation({ summary: '响应邀请（接受或拒绝）' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  respondToInvitation(@CurrentUser() user: any, @Body() dto: RespondInvitationDto) {
    return this.teamService.respondToInvitation(user.id, dto);
  }

  @Get('my/invitations')
  @ApiOperation({ summary: '获取我的邀请列表' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findMyInvitations(@CurrentUser() user: any) {
    return this.teamService.findMyInvitations(user.id);
  }

  @Post(':id/remove-member')
  @ApiOperation({ summary: '移除成员' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  removeMember(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: RemoveMemberDto) {
    return this.teamService.removeMember(user.id, id, dto);
  }

  @Post(':id/leave')
  @ApiOperation({ summary: '退出团队' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  leaveTeam(@CurrentUser() user: any, @Param('id') id: string, @Body() body: { reason?: string }) {
    return this.teamService.leaveTeam(user.id, id, body.reason);
  }

  @Post(':id/transfer')
  @ApiOperation({ summary: '转移队长' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  transferCaptain(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: TransferCaptainDto) {
    return this.teamService.transferCaptain(user.id, id, dto);
  }

  @Post(':id/dissolve')
  @ApiOperation({ summary: '解散团队' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  dissolveTeam(@CurrentUser() user: any, @Param('id') id: string, @Body() body: { reason?: string }) {
    return this.teamService.dissolveTeam(user.id, id, body.reason);
  }

  @Post(':id/lock')
  @ApiOperation({ summary: '锁定团队' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  lockTeam(@CurrentUser() user: any, @Param('id') id: string) {
    return this.teamService.lockTeam(user.id, id);
  }

  @Get('my/list')
  @ApiOperation({ summary: '获取我的团队列表' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findMyTeams(@CurrentUser() user: any, @Query() query: TeamQueryDto & PaginationDto) {
    return this.teamService.findMyTeams(user.id, query);
  }

  @Get(':id/join-by-code')
  @ApiOperation({ summary: '通过邀请码查看团队信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findTeamByCode(@CurrentUser() user: any, @Param('id') code: string) {
    return this.teamService.findTeamByCode(user.id, code);
  }

  @Get()
  @ApiOperation({ summary: '获取可加入的团队列表' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  findAllTeams(@Query() query: TeamQueryDto & PaginationDto) {
    return this.teamService.findAllTeams(query);
  }
}