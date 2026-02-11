import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Client } from './client.entity';
import { Income } from './income.entity';
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
        default: ProjectStatus.NEW,
    })
    status: ProjectStatus;

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    deliveryDate: Date;

    @Column()
    clientId: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;

    @OneToMany(() => Income, (income) => income.project)
    incomes: Income[];

    @CreateDateColumn()
    createdAt: Date;
}
