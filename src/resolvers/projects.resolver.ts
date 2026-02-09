import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../entities/project.entity';
import { CreateProjectInput } from '../dto/projects/create-project.input';
import { UpdateProjectInput } from '../dto/projects/update-project.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Client } from '../entities/client.entity';
import { ClientsService } from '../services/clients.service';
import { Payment } from '../entities/payment.entity';
import { PaymentsService } from '../services/payments.service';

@Resolver(() => Project)
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('admin')
export class ProjectsResolver {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly clientsService: ClientsService,
        @Inject(forwardRef(() => PaymentsService))
        private readonly paymentsService: PaymentsService,
    ) { }

    @Mutation(() => Project)
    createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
        return this.projectsService.create(createProjectInput);
    }

    @Query(() => [Project], { name: 'projects' })
    findAll() {
        return this.projectsService.findAll();
    }

    @Query(() => Project, { name: 'project' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.projectsService.findOne(id);
    }

    @Mutation(() => Project)
    updateProject(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
    ) {
        return this.projectsService.update(id, updateProjectInput);
    }

    @Mutation(() => Boolean)
    removeProject(@Args('id', { type: () => ID }) id: string) {
        return this.projectsService.remove(id);
    }

    @ResolveField(() => Client)
    client(@Parent() project: Project) {
        return this.clientsService.findOne(project.clientId);
    }

    @ResolveField(() => [Payment])
    payments(@Parent() project: Project) {
        return this.paymentsService.findByProject(project.id);
    }
}
