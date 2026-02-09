import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationInput {
    @IsNotEmpty({ message: 'El mensaje es requerido' })
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    clientId?: string;
}
