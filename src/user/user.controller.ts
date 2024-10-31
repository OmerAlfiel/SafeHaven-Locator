import { Controller, Post, Body, Request, UseGuards, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() body: any) {
    const { username, password, emergencyContactName, emergencyContactPhone } = body;
    return this.userService.register(username, password, emergencyContactName, emergencyContactPhone);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.getUserById(userId);
  }
}