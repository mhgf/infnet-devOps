import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskRepository } from 'src/database/repositories/task.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { IdParam } from 'src/dtos/id.dto';
import { ChangeStatus } from './dtos/change-status.dto';
import { CreateTask } from './dtos/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private taskRepo: TaskRepository,
    private userRepo: UserRepository,
  ) {}

  @Get()
  async getAll() {
    return this.taskRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  @Get('/:id')
  async getTask(@Param() { _id }: IdParam) {
    const task = await this.taskRepo.findOne({
      where: {
        id: _id,
      },
    });
    if (task == null) throw new NotFoundException(`Task not found ${_id}`);
    return task;
  }

  @Post()
  async create(@Body() { userId, description }: CreateTask) {
    const user = await this.userRepo.findOneBy({
      id: userId,
    });

    if (user == null) throw new BadRequestException('Invalid user');

    const task = await this.taskRepo.save({
      description,
      user,
    });
    delete task.user;
    return task;
  }

  @Patch(':id/status')
  async changeStatus(
    @Param() { _id }: IdParam,
    @Body() { status }: ChangeStatus,
  ) {
    const count = await this.taskRepo.countBy({
      id: _id,
    });

    if (count == 0) throw new BadRequestException('Invalid task');

    await this.taskRepo.update(_id, {
      status,
    });
    return true;
  }
}
