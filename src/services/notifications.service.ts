import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationInput } from '../dto/notifications/create-notification.input';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) { }

    async create(createNotificationInput: CreateNotificationInput): Promise<Notification> {
        const notification = this.notificationRepository.create(createNotificationInput);
        return await this.notificationRepository.save(notification);
    }

    async findAll(unreadOnly = false): Promise<Notification[]> {
        const where = unreadOnly ? { isRead: false } : {};
        return await this.notificationRepository.find({
            where,
            relations: ['client'],
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(id: string): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({ where: { id } });
        if (!notification) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }
        notification.isRead = true;
        return await this.notificationRepository.save(notification);
    }

    async markAllAsRead(): Promise<void> {
        await this.notificationRepository.update({ isRead: false }, { isRead: true });
    }

    async delete(id: string): Promise<void> {
        console.log(`Borrando notificación con ID: ${id}`);
        const result = await this.notificationRepository.delete(id);
        console.log(`Resultado del borrado: ${result.affected} filas afectadas`);
        if (result.affected === 0) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }
    }
}
