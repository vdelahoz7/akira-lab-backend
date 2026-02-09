import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
