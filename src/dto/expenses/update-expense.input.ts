import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseInput } from './create-expense.input';

export class UpdateExpenseInput extends PartialType(CreateExpenseInput) { }
