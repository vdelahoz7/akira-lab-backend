import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientInput } from '../dto/clients/create-client.input';
import { UpdateClientInput } from '../dto/clients/update-client.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    create(@Body() createClientInput: CreateClientInput) {
        return this.clientsService.create(createClientInput);
    }

    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientInput: UpdateClientInput) {
        return this.clientsService.update(id, updateClientInput);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(id);
    }
}
