import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientInput {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
