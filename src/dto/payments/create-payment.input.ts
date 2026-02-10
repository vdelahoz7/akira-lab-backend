import { IsNotEmpty, IsDateString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentInput {
    @IsNumber({}, { message: 'El monto debe ser un número' })
    @Min(0, { message: 'El monto no puede ser negativo' })
    amount: number;

    @IsDateString()
    @Type(() => Date)
    date: Date | string;

    @IsNotEmpty()
    projectId: string;
}
