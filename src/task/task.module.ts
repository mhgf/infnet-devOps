import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TaskController } from './task.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
