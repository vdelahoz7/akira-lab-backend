import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateNotificationInput {
    @Field()
    @IsNotEmpty({ message: 'El mensaje es requerido' })
    @IsString()
    message: string;

    @Field(() => ID, { nullable: true })
    @IsOptional()
    @IsString()
    clientId?: string;
}
