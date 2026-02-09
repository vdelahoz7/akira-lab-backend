import { MinLength } from 'class-validator';

export class ChangePasswordInput {
    oldPassword: string;

    @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
    newPassword: string;
}
