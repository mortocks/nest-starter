import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findMany(): Promise<User[]> {
    return this.userService.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser({ id });
  }
}
