import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ClientStatus } from '../../types/client-status.enum';
import { ClientSource } from '../../types/client-source.enum';

export class CreateClientInput {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(ClientSource)
  source?: ClientSource;

  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  notes?: string;
}
