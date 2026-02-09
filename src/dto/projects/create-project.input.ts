import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { ProjectStatus } from '../../types/project-status.enum';

@InputType()
export class CreateProjectInput {
    @Field()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    name: string;

    @Field(() => ProjectStatus, { defaultValue: ProjectStatus.IN_PROGRESS })
    @IsEnum(ProjectStatus)
    status: ProjectStatus;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    notes?: string;

    @Field()
    @IsDate()
    startDate: Date;

    @Field()
    @IsDate()
    deliveryDate: Date;

    @Field(() => ID)
    @IsNotEmpty()
    clientId: string;
}
