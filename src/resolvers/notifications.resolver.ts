import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationInput } from '../dto/notifications/create-notification.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Resolver(() => Notification)
export class NotificationsResolver {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Mutation(() => Notification)
    createNotification(@Args('createNotificationInput') createNotificationInput: CreateNotificationInput) {
        return this.notificationsService.create(createNotificationInput);
    }

    @Query(() => [Notification], { name: 'notifications' })
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles('admin')
    findAll(@Args('unreadOnly', { type: () => Boolean, nullable: true }) unreadOnly?: boolean) {
        return this.notificationsService.findAll(unreadOnly);
    }

    @Mutation(() => Notification)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles('admin')
    markAsRead(@Args('id', { type: () => ID }) id: string) {
        return this.notificationsService.markAsRead(id);
    }
}
