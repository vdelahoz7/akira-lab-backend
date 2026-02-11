import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from '../entities/income.entity';
import { CreateIncomeInput } from '../dto/incomes/create-income.input';
import { UpdateIncomeInput } from '../dto/incomes/update-income.input';
import { ActivitiesService } from './activities.service';
import { NotificationsService } from './notifications.service';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Injectable()
export class IncomesService {
    constructor(
        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>,
        private readonly activitiesService: ActivitiesService,
        private readonly notificationsService: NotificationsService,
    ) { }

    async create(createIncomeInput: CreateIncomeInput): Promise<Income> {
        const incomeData = {
            ...createIncomeInput,
            date: new Date(createIncomeInput.date),
        };
        const income = this.incomeRepository.create(incomeData);
        const savedIncome = await this.incomeRepository.save(income);

        await this.activitiesService.log(
            ActivityEntityType.INCOME,
            savedIncome.id,
            ActivityAction.PAYMENT,
            `Nuevo ingreso registrado: $${savedIncome.amount}`,
        );

        await this.notificationsService.create({
            title: 'Ingreso Registrado',
            message: `Se ha registrado un nuevo ingreso de $${savedIncome.amount} para el proyecto ${savedIncome.projectId}.`,
        });

        return savedIncome;
    }

    async findAll(): Promise<Income[]> {
        return await this.incomeRepository.find({
            relations: ['project', 'project.client'],
            order: { date: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Income> {
        const income = await this.incomeRepository.findOne({
            where: { id },
            relations: ['project', 'project.client'],
        });
        if (!income) {
            throw new NotFoundException(`Ingreso con ID ${id} no encontrado`);
        }
        return income;
    }

    async findByProject(projectId: string): Promise<Income[]> {
        return await this.incomeRepository.find({
            where: { projectId },
            order: { date: 'DESC' },
        });
    }

    async update(id: string, updateIncomeInput: UpdateIncomeInput): Promise<Income> {
        const income = await this.findOne(id);
        const { date, ...rest } = updateIncomeInput;

        Object.assign(income, rest);

        if (date) {
            income.date = new Date(date);
        }

        const savedIncome = await this.incomeRepository.save(income);

        await this.activitiesService.log(
            ActivityEntityType.INCOME,
            id,
            ActivityAction.UPDATED,
            `Ingreso actualizado`,
        );

        return savedIncome;
    }

    async remove(id: string): Promise<boolean> {
        const income = await this.findOne(id);
        await this.incomeRepository.remove(income);
        return true;
    }
}
