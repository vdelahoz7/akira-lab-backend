import { IsNotEmpty, IsNumber, IsDateString, IsEnum, IsString, IsOptional } from 'class-validator';
import { IncomeStatus } from '../../types/income-status.enum';

export class CreateIncomeInput {
    @IsNotEmpty()
    @IsString()
    projectId: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsOptional()
    @IsEnum(IncomeStatus)
    status?: IncomeStatus;

    @IsNotEmpty()
    @IsDateString()
    date: string;
}
