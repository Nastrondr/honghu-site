import { Controller, Get, Put, Post, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { QueryNotificationDto, CreateNotificationDto, BatchCreateNotificationDto } from './dto/notification.dto';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Get user notifications' })
  @Get()
  async findAll(@CurrentUser() user: any, @Query() query: QueryNotificationDto) {
    return this.notificationService.findAll(user.id, query);
  }

  @ApiOperation({ summary: 'Get unread notification count' })
  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: any) {
    return this.notificationService.getUnreadCount(user.id);
  }

  @ApiOperation({ summary: 'Mark notification as read' })
  @Put(':id/read')
  async markAsRead(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    return this.notificationService.markAsRead(id, user.id);
  }

  @ApiOperation({ summary: 'Mark all notifications as read' })
  @Put('read-all')
  async markAllAsRead(@CurrentUser() user: any) {
    return this.notificationService.markAllAsRead(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create notification (admin)' })
  @Post('admin/notifications')
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Create batch notifications (admin)' })
  @Post('admin/notifications/batch')
  async createBatch(@Body() batchDto: BatchCreateNotificationDto) {
    return this.notificationService.createBatch(batchDto);
  }
}
