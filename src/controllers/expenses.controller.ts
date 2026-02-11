import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { CreateExpenseInput } from '../dto/expenses/create-expense.input';
import { UpdateExpenseInput } from '../dto/expenses/update-expense.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    create(@Body() createExpenseInput: CreateExpenseInput) {
        return this.expensesService.create(createExpenseInput);
    }

    @Get()
    findAll() {
        return this.expensesService.findAll();
    }

    @Get('stats/monthly')
    getMonthlyStats() {
        return this.expensesService.getMonthlyStats();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expensesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExpenseInput: UpdateExpenseInput) {
        return this.expensesService.update(id, updateExpenseInput);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expensesService.remove(id);
    }
}
