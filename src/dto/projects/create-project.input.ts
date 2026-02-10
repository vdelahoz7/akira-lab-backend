import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus } from '../../types/project-status.enum';

export class CreateProjectInput {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    name: string;

    @IsEnum(ProjectStatus)
    status: ProjectStatus;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsDateString({}, { message: 'startDate debe ser una fecha válida' })
    startDate: string;

    @IsDateString({}, { message: 'deliveryDate debe ser una fecha válida' })
    deliveryDate: string;

    @IsNotEmpty()
    clientId: string;
}
