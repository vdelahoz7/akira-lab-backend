import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectInput } from '../dto/projects/create-project.input';
import { UpdateProjectInput } from '../dto/projects/update-project.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Body() createProjectInput: CreateProjectInput) {
        return this.projectsService.create(createProjectInput);
    }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectInput: UpdateProjectInput) {
        return this.projectsService.update(id, updateProjectInput);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
