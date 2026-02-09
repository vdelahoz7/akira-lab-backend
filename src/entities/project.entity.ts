import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Client } from './client.entity';
import { Payment } from './payment.entity';
import { ProjectStatus } from '../types/project-status.enum';

@Entity('projects')
@ObjectType()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.IN_PROGRESS,
    })
    @Field(() => ProjectStatus)
    status: ProjectStatus;

    @Column({ nullable: true })
    @Field({ nullable: true })
    notes: string;

    @Column()
    @Field()
    startDate: Date;

    @Column()
    @Field()
    deliveryDate: Date;

    @Column()
    @Field()
    clientId: string;

    @ManyToOne(() => Client, (client) => client.projects)
    @Field(() => Client)
    client: Client;

    @OneToMany(() => Payment, (payment) => payment.project)
    @Field(() => [Payment], { nullable: true })
    payments: Payment[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;
}
