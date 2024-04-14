import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { IdParam } from 'src/dtos/id.dto';
import { CreateUser } from './dtos/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private userRepo: UserRepository) {}

  @Get()
  async getUsers() {
    return await this.userRepo.find();
  }

  @Get('/:id')
  async getUser(@Param() { _id }: IdParam) {
    const user = await this.userRepo.findOne({
      where: {
        id: _id,
      },
    });
    if (user == null) throw new NotFoundException(`User not found ${_id}`);
    return user;
  }

  @Post()
  async create(@Body() user: CreateUser) {
    const count = await this.userRepo.count({
      where: {
        email: user.email,
      },
    });

    if (count > 0) throw new BadRequestException('Email invalido');
    return await this.userRepo.save({ ...user });
  }
}
