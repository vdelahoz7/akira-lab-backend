import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { Client } from '../entities/client.entity';
import { CreateClientInput } from '../dto/clients/create-client.input';
import { UpdateClientInput } from '../dto/clients/update-client.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';

@Resolver(() => Client)
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('admin')
export class ClientsResolver {
    constructor(
        private readonly clientsService: ClientsService,
        @Inject(forwardRef(() => ProjectsService))
        private readonly projectsService: ProjectsService,
    ) { }

    @ResolveField(() => [Project])
    projects(@Parent() client: Client) {
        return this.projectsService.findByClient(client.id);
    }

    @Mutation(() => Client)
    createClient(@Args('createClientInput') createClientInput: CreateClientInput) {
        return this.clientsService.create(createClientInput);
    }

    @Query(() => [Client], { name: 'clients' })
    findAll() {
        return this.clientsService.findAll();
    }

    @Query(() => Client, { name: 'client' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.clientsService.findOne(id);
    }

    @Mutation(() => Client)
    updateClient(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateClientInput') updateClientInput: UpdateClientInput,
    ) {
        return this.clientsService.update(id, updateClientInput);
    }

    @Mutation(() => Boolean)
    removeClient(@Args('id', { type: () => ID }) id: string) {
        return this.clientsService.remove(id);
    }
}
