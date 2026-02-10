import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationInput } from '../dto/notifications/create-notification.input';

@Controller('public/notifications')
export class PublicNotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    create(@Body() createNotificationInput: CreateNotificationInput) {
        return this.notificationsService.create(createNotificationInput);
    }
}
