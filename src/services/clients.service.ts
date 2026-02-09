import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientInput } from '../dto/clients/create-client.input';
import { UpdateClientInput } from '../dto/clients/update-client.input';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }

    async create(createClientInput: CreateClientInput): Promise<Client> {
        const client = this.clientRepository.create(createClientInput);
        return await this.clientRepository.save(client);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientRepository.find({
            relations: ['projects', 'notifications'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Client> {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: ['projects', 'notifications'],
        });
        if (!client) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return client;
    }

    async update(id: string, updateClientInput: UpdateClientInput): Promise<Client> {
        const client = await this.findOne(id);
        Object.assign(client, updateClientInput);
        return await this.clientRepository.save(client);
    }

    async remove(id: string): Promise<boolean> {
        const client = await this.findOne(id);
        await this.clientRepository.remove(client);
        return true;
    }
}
