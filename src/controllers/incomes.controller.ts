import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IncomesService } from '../services/incomes.service';
import { CreateIncomeInput } from '../dto/incomes/create-income.input';
import { UpdateIncomeInput } from '../dto/incomes/update-income.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
    constructor(private readonly incomesService: IncomesService) { }

    @Post()
    create(@Body() createIncomeInput: CreateIncomeInput) {
        return this.incomesService.create(createIncomeInput);
    }

    @Get()
    findAll() {
        return this.incomesService.findAll();
    }

    @Get('project/:projectId')
    findByProject(@Param('projectId') projectId: string) {
        return this.incomesService.findByProject(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.incomesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateIncomeInput: UpdateIncomeInput) {
        return this.incomesService.update(id, updateIncomeInput);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.incomesService.remove(id);
    }
}
