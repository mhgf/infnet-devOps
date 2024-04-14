import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUser {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;
}
