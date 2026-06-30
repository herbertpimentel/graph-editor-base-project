import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './public.guard';
import { AuthGuard } from './auth.guard';
import { AuthSignInRequestArgs } from './types/auth.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  authLoginRequest(@Body() params: AuthSignInRequestArgs) {
    return this.authService.signIn(params);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getProfile() {
    return this.authService.me();
  }
}
