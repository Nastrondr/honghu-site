import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateAwardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competitionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trackId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  awardName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  awardLevel!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  awardDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  prizeAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prizeDetail?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  displayOrder?: number;
}

export class UpdateAwardDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  awardName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  awardLevel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  awardDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  prizeAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prizeDetail?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  displayOrder?: number;
}

export class AwardWorkDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  awardId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  rank?: number;
}
