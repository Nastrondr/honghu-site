import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  realName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  birthDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;
}

export class SwitchRoleDto {
  @ApiProperty({ 
    enum: ['registered', 'contestant', 'team_leader', 'team_member', 'reviewer', 'operator', 'super_admin', 'enterprise_applicant', 'organizer_applicant'],
    description: '要切换到的角色'
  })
  @IsString()
  @IsNotEmpty()
  currentRole: string;
}

export class SelectIdentityDto {
  @ApiProperty({ 
    enum: ['contestant', 'team_leader', 'enterprise_applicant', 'organizer_applicant'],
    description: '选择身份类型'
  })
  @IsString()
  @IsNotEmpty()
  identityType: string;
}

export enum UserRole {
  REGISTERED = 'registered',
  CONTESTANT = 'contestant',
  TEAM_LEADER = 'team_leader',
  TEAM_MEMBER = 'team_member',
  REVIEWER = 'reviewer',
  OPERATOR = 'operator',
  SUPER_ADMIN = 'super_admin',
  ENTERPRISE_APPLICANT = 'enterprise_applicant',
  ORGANIZER_APPLICANT = 'organizer_applicant',
}

export class UserRoleResponse {
  @ApiProperty()
  role: string;

  @ApiProperty()
  roleName: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  expiresAt?: string;
}

export class DashboardTypeResponse {
  @ApiProperty({ enum: ['contestant', 'reviewer', 'operator', 'enterprise', 'organizer', 'admin', 'registered'] })
  dashboardType: string;

  @ApiProperty()
  redirectUrl: string;
}
