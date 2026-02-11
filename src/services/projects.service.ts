import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectInput } from '../dto/projects/create-project.input';
import { UpdateProjectInput } from '../dto/projects/update-project.input';
import { ActivitiesService } from './activities.service';
import { NotificationsService } from './notifications.service';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly activitiesService: ActivitiesService,
        private readonly notificationsService: NotificationsService,
    ) { }

    async create(createProjectInput: CreateProjectInput): Promise<Project> {
        const projectData = {
            ...createProjectInput,
            startDate: new Date(createProjectInput.startDate),
            deliveryDate: new Date(createProjectInput.deliveryDate),
            dueDate: createProjectInput.dueDate ? new Date(createProjectInput.dueDate) : undefined,
        };
        const project = this.projectRepository.create(projectData);
        const savedProject = await this.projectRepository.save(project);

        await this.activitiesService.log(
            ActivityEntityType.PROJECT,
            savedProject.id,
            ActivityAction.CREATED,
            `Nuevo proyecto creado: ${savedProject.name}`,
        );

        await this.notificationsService.create({
            title: 'Nuevo Proyecto',
            message: `El proyecto ${savedProject.name} ha sido registrado para el cliente ${savedProject.clientId}.`,
            clientId: savedProject.clientId,
        });

        return savedProject;
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({
            relations: ['client', 'incomes'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['client', 'incomes'],
        });
        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
        return project;
    }

    async findByClient(clientId: string): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { clientId },
            order: { createdAt: 'DESC' },
        });
    }

    async update(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
        const project = await this.findOne(id);
        const oldStatus = project.status;

        const { startDate, deliveryDate, dueDate, ...otherFields } = updateProjectInput;
        const updateData: Partial<Project> = { ...otherFields };

        if (startDate) updateData.startDate = new Date(startDate);
        if (deliveryDate) updateData.deliveryDate = new Date(deliveryDate);
        if (dueDate) updateData.dueDate = new Date(dueDate);

        Object.assign(project, updateData);
        const savedProject = await this.projectRepository.save(project);

        if (updateProjectInput.status && oldStatus !== updateProjectInput.status) {
            await this.activitiesService.log(
                ActivityEntityType.PROJECT,
                id,
                ActivityAction.STATUS_CHANGED,
                `Estado de proyecto cambiado de ${oldStatus} a ${updateProjectInput.status}`,
            );

            await this.notificationsService.create({
                title: 'Estado de Proyecto Actualizado',
                message: `El proyecto ${savedProject.name} ahora está en estado: ${updateProjectInput.status}.`,
                clientId: savedProject.clientId,
            });
        } else {
            await this.activitiesService.log(
                ActivityEntityType.PROJECT,
                id,
                ActivityAction.UPDATED,
                `Datos del proyecto actualizados`,
            );
        }

        return savedProject;
    }

    async remove(id: string): Promise<boolean> {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
        return true;
    }
}
