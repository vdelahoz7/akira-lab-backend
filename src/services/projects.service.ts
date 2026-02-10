import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectInput } from '../dto/projects/create-project.input';
import { UpdateProjectInput } from '../dto/projects/update-project.input';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async create(createProjectInput: CreateProjectInput): Promise<Project> {
        const projectData = {
            ...createProjectInput,
            startDate: new Date(createProjectInput.startDate),
            deliveryDate: new Date(createProjectInput.deliveryDate),
        };
        const project = this.projectRepository.create(projectData);
        return await this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({
            relations: ['client', 'payments'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['client', 'payments'],
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
        const updateData: Partial<Project> = { ...updateProjectInput };
        if (updateProjectInput.startDate) {
            updateData.startDate = new Date(updateProjectInput.startDate);
        }
        if (updateProjectInput.deliveryDate) {
            updateData.deliveryDate = new Date(updateProjectInput.deliveryDate);
        }
        Object.assign(project, updateData);
        return await this.projectRepository.save(project);
    }

    async remove(id: string): Promise<boolean> {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
        return true;
    }
}
