import { IsEnum } from 'class-validator';
import { taskStatus } from 'src/enum/task.enum';

export class ChangeStatus {
  @IsEnum(taskStatus)
  status: taskStatus;
}
