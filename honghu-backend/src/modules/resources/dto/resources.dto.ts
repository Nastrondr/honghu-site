import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competitionId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trackId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  resourceType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiPropertyOptional({ enum: ['public', 'contestant', 'team', 'reviewer', 'operator'] })
  @IsOptional()
  @IsString()
  accessLevel?: string;
}

export class UpdateResourceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiPropertyOptional({ enum: ['public', 'contestant', 'team', 'reviewer', 'operator'] })
  @IsOptional()
  @IsString()
  accessLevel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ResourceQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  competitionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trackId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  resourceType?: string;

  @ApiPropertyOptional({ enum: ['public', 'contestant', 'team', 'reviewer', 'operator'] })
  @IsOptional()
  @IsString()
  accessLevel?: string;
}

export class DownloadResourceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  teamId?: string;
}