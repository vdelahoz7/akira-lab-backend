import { IsNotEmpty, IsDateString, IsNumber, Min } from 'class-validator';

export class CreatePaymentInput {
    @IsNumber({}, { message: 'El monto debe ser un número' })
    @Min(0, { message: 'El monto no puede ser negativo' })
    amount: number;

    @IsDateString()
    date: string;

    @IsNotEmpty()
    projectId: string;
}
