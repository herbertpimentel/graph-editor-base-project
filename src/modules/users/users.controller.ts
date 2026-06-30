import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserDTO } from './types/users.dto';
import { UsersService } from './users.service';

import { Public } from 'src/modules/auth/public.guard';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ operationId: 'getAllUsers' })
  @ApiResponse({ type: UserDTO, isArray: true })
  getUsersAll() {
    return this.usersService.getUsersAll();
  }
}
