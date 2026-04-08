import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto, SwitchRoleDto, SelectIdentityDto } from './dto/users.dto';
import { CurrentUser, Public } from '../../common';

@ApiTags('Users')
@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: '获取当前用户完整信息' })
  @ApiResponse({ status: 200, description: '返回用户信息和资料' })
  getCurrentUser(@CurrentUser() user: any) {
    return this.usersService.findById(user.id);
  }

  @Put('me')
  @ApiOperation({ summary: '更新当前用户资料' })
  @ApiResponse({ status: 200, description: '资料更新成功' })
  updateUser(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.update(user.id, dto);
  }

  @Get('me/roles')
  @ApiOperation({ summary: '查看我当前拥有的所有角色' })
  @ApiResponse({ status: 200, description: '返回用户所有角色列表' })
  getMyRoles(@CurrentUser() user: any) {
    return this.usersService.getMyRoles(user.id);
  }

  @Get('me/dashboard')
  @ApiOperation({ summary: '获取登录后默认工作台类型' })
  @ApiResponse({ status: 200, description: '返回工作台类型和跳转地址' })
  getDashboardType(@CurrentUser() user: any) {
    return this.usersService.getDashboardType(user.id);
  }

  @Put('me/switch-role')
  @ApiOperation({ summary: '切换当前角色' })
  @ApiResponse({ status: 200, description: '角色切换成功，返回跳转地址' })
  switchRole(@CurrentUser() user: any, @Body() dto: SwitchRoleDto) {
    return this.usersService.switchRole(user.id, dto);
  }

  @Post('me/identity')
  @ApiOperation({ summary: '首次登录选择身份' })
  @ApiResponse({ status: 201, description: '身份选择成功，返回跳转地址' })
  selectIdentity(
    @CurrentUser() user: any,
    @Body() dto: SelectIdentityDto,
  ) {
    return this.usersService.selectIdentity(user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定用户信息（管理员）' })
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
