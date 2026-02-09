import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsDate, IsNumber, Min } from 'class-validator';

@InputType()
export class CreatePaymentInput {
    @Field(() => Float)
    @IsNumber({}, { message: 'El monto debe ser un número' })
    @Min(0, { message: 'El monto no puede ser negativo' })
    amount: number;

    @Field()
    @IsDate()
    date: Date;

    @Field(() => ID)
    @IsNotEmpty()
    projectId: string;
}
