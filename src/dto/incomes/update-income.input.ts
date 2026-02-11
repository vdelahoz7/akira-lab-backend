import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeInput } from './create-income.input';

export class UpdateIncomeInput extends PartialType(CreateIncomeInput) { }
