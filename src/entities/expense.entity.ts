import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ExpenseCategory } from '../types/expense-category.enum';
import { ExpenseType } from '../types/expense-type.enum';

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    concept: string;

    @Column({
        type: 'enum',
        enum: ExpenseType,
        default: ExpenseType.VARIABLE,
    })
    type: ExpenseType;

    @Column({
        type: 'enum',
        enum: ExpenseCategory,
        default: ExpenseCategory.OTHER,
    })
    category: ExpenseCategory;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;
}
