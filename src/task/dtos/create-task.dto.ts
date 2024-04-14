import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTask {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(3)
  description: string;
}
