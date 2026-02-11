import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from '../services/expenses.service';
import { ExpensesController } from '../controllers/expenses.controller';
import { Expense } from '../entities/expense.entity';
import { ActivitiesModule } from './activities.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Expense]),
        ActivitiesModule,
    ],
    controllers: [ExpensesController],
    providers: [ExpensesService],
    exports: [ExpensesService],
})
export class ExpensesModule { }
