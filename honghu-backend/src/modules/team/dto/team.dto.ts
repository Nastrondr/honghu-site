import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competitionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trackId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxMembers?: number;
}

export class UpdateTeamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxMembers?: number;

  @ApiPropertyOptional()
  @IsOptional()
  requireApproval?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}

export class TeamQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  competitionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trackId?: string;
}

export class InviteMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  inviteeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;
}

export class InviteByEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  inviteeEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;
}

export class AcceptInvitationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invitationId: string;
}

export class RespondInvitationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invitationId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accept: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  responseComment?: string;
}

export class RemoveMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class TransferCaptainDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newLeaderId: string;
}

export class JoinTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}