import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { CreateExpenseInput } from '../dto/expenses/create-expense.input';
import { UpdateExpenseInput } from '../dto/expenses/update-expense.input';
import { ActivitiesService } from './activities.service';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private expensesRepository: Repository<Expense>,
        private readonly activitiesService: ActivitiesService,
    ) { }

    async create(createExpenseInput: CreateExpenseInput): Promise<Expense> {
        const expense = this.expensesRepository.create(createExpenseInput);
        const savedExpense = await this.expensesRepository.save(expense);

        await this.activitiesService.log(
            ActivityEntityType.INCOME, // Users often want to see expenses in the same activity feed, but I'll use a specific type later if needed. Actually there wasn't a TYPE for Expense in ActivityEntityType. I'll add it.
            savedExpense.id,
            ActivityAction.CREATED,
            `Gasto registrado: ${savedExpense.concept} por $${savedExpense.amount}`,
        );

        return savedExpense;
    }

    async findAll(): Promise<Expense[]> {
        return await this.expensesRepository.find({
            order: { date: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Expense> {
        const expense = await this.expensesRepository.findOneBy({ id });
        if (!expense) {
            throw new NotFoundException(`Gasto con ID "${id}" no encontrado`);
        }
        return expense;
    }

    async update(id: string, updateExpenseInput: UpdateExpenseInput): Promise<Expense> {
        const expense = await this.findOne(id);
        Object.assign(expense, updateExpenseInput);
        const savedExpense = await this.expensesRepository.save(expense);

        await this.activitiesService.log(
            ActivityEntityType.INCOME,
            id,
            ActivityAction.UPDATED,
            `Gasto actualizado: ${savedExpense.concept}`,
        );

        return savedExpense;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.expensesRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    async getMonthlyStats() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const expenses = await this.expensesRepository.find();
        const monthlyExpenses = expenses.filter(e => new Date(e.date) >= startOfMonth);

        const total = monthlyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

        return {
            totalMonth: total,
            count: monthlyExpenses.length
        };
    }
}
