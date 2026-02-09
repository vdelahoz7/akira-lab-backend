import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
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

    @IsDate()
    startDate: Date;

    @IsDate()
    deliveryDate: Date;

    @IsNotEmpty()
    clientId: string;
}
