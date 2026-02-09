import { IsEmail } from 'class-validator';

export class LoginInput {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    password: string;
}
