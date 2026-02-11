import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ExpenseCategory } from '../../types/expense-category.enum';
import { ExpenseType } from '../../types/expense-type.enum';

export class CreateExpenseInput {
    @IsNotEmpty()
    @IsString()
    concept: string;

    @IsNotEmpty()
    @IsEnum(ExpenseType)
    type: ExpenseType;

    @IsNotEmpty()
    @IsEnum(ExpenseCategory)
    category: ExpenseCategory;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    notes?: string;
}
