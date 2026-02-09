import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
    @Field()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    name: string;

    @Field()
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    phone?: string;
}
