import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientInput } from '../dto/clients/create-client.input';
import { UpdateClientInput } from '../dto/clients/update-client.input';

import { ActivitiesService } from './activities.service';
import { NotificationsService } from './notifications.service';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly activitiesService: ActivitiesService,
    private readonly notificationsService: NotificationsService,
  ) { }

  async create(createClientInput: CreateClientInput): Promise<Client> {
    const client = this.clientRepository.create(createClientInput);
    const savedClient = await this.clientRepository.save(client);

    // Log activity
    await this.activitiesService.log(
      ActivityEntityType.CLIENT,
      savedClient.id,
      ActivityAction.CREATED,
      `Nuevo cliente creado: ${savedClient.name}`,
    );

    // Create notification
    await this.notificationsService.create({
      title: 'Nuevo Cliente',
      message: `El cliente ${savedClient.name} ha sido registrado exitosamente.`,
      clientId: savedClient.id,
    });

    return savedClient;
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

  async update(
    id: string,
    updateClientInput: UpdateClientInput,
  ): Promise<Client> {
    const client = await this.findOne(id);
    const oldStatus = client.status;
    Object.assign(client, updateClientInput);
    const savedClient = await this.clientRepository.save(client);

    if (updateClientInput.status && oldStatus !== updateClientInput.status) {
      await this.activitiesService.log(
        ActivityEntityType.CLIENT,
        id,
        ActivityAction.STATUS_CHANGED,
        `Estado cambiado de ${oldStatus} a ${updateClientInput.status}`,
      );
    } else {
      await this.activitiesService.log(
        ActivityEntityType.CLIENT,
        id,
        ActivityAction.UPDATED,
        `Datos del cliente actualizados`,
      );
    }

    return savedClient;
  }

  async remove(id: string): Promise<boolean> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
    return true;
  }
}
