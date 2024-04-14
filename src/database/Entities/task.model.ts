import { taskStatus } from 'src/enum/task.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity({
  name: 'tasks',
})
export class TaskModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: taskStatus,
    default: taskStatus.CREATED,
  })
  status: taskStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserModel, (user) => user.tasks, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UserModel;
}
