import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CompetitionQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;
}

export class CreateCompetitionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  posterUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ruleUrl?: string;

  @ApiProperty()
  @IsNumber()
  maxTeamSize: number;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationEnd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  competitionStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  competitionEnd?: string;
}

export class UpdateCompetitionDto extends CreateCompetitionDto {}

export class TrackQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  competitionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  competitionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxTeams?: number;

  @ApiProperty()
  @IsNumber()
  maxTeamSize: number;

  @ApiProperty()
  @IsNumber()
  minTeamSize: number;
}
