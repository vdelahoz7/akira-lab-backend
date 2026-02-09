import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('admins')
@ObjectType()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;
}
