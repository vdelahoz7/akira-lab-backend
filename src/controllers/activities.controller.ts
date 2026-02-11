import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ActivitiesService } from '../services/activities.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ActivityEntityType } from '../types/activity-entity-type.enum';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) { }

    @Get()
    findAll() {
        return this.activitiesService.findAll();
    }

    @Get(':entityType/:entityId')
    findByEntity(
        @Param('entityType') entityType: ActivityEntityType,
        @Param('entityId') entityId: string
    ) {
        return this.activitiesService.findByEntity(entityType, entityId);
    }
}
