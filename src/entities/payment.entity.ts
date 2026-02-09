import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Project } from './project.entity';

@Entity('payments')
@ObjectType()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @Field(() => Float)
    amount: number;

    @Column()
    @Field()
    date: Date;

    @Column()
    @Field()
    projectId: string;

    @ManyToOne(() => Project, (project) => project.payments)
    @Field(() => Project)
    project: Project;

    @CreateDateColumn()
    @Field()
    createdAt: Date;
}
