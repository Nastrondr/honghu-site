import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID, IsBoolean, IsInt, Min } from 'class-validator';

export class QueryNotificationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkId?: string;
}

export class BatchCreateNotificationDto {
  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  userIds!: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkId?: string;
}
