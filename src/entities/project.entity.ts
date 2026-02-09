import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Client } from './client.entity';
import { Payment } from './payment.entity';
import { ProjectStatus } from '../types/project-status.enum';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.IN_PROGRESS,
    })
    status: ProjectStatus;

    @Column({ nullable: true })
    notes: string;

    @Column()
    startDate: Date;

    @Column()
    deliveryDate: Date;

    @Column()
    clientId: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;

    @OneToMany(() => Payment, (payment) => payment.project)
    payments: Payment[];

    @CreateDateColumn()
    createdAt: Date;
}
