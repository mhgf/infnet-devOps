import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskModel } from '../Entities/task.model';

@Injectable()
export class TaskRepository extends Repository<TaskModel> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(TaskModel, dataSource.createEntityManager());
  }
}
