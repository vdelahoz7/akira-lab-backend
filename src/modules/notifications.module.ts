import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from '../services/notifications.service';
import { NotificationsController } from '../controllers/notifications.controller';
import { PublicNotificationsController } from '../controllers/public-notifications.controller';
import { Notification } from '../entities/notification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notification])],
    controllers: [NotificationsController, PublicNotificationsController],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule { }
