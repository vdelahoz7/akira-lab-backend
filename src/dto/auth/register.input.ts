import { IsEmail, MinLength } from 'class-validator';

export class RegisterInput {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}
