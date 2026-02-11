import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './project.entity';
import { IncomeStatus } from '../types/income-status.enum';

@Entity('incomes')
export class Income {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: IncomeStatus,
        default: IncomeStatus.PAID,
    })
    status: IncomeStatus;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column()
    projectId: string;

    @ManyToOne(() => Project, (project) => project.incomes)
    project: Project;

    @CreateDateColumn()
    createdAt: Date;
}
