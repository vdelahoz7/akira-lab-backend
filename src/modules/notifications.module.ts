import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from '../services/notifications.service';
import { NotificationsResolver } from '../resolvers/notifications.resolver';
import { Notification } from '../entities/notification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notification])],
    providers: [NotificationsService, NotificationsResolver],
    exports: [NotificationsService],
})
export class NotificationsModule { }
