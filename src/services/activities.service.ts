import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) { }

    async log(
        entityType: ActivityEntityType,
        entityId: string,
        action: ActivityAction,
        description: string,
    ): Promise<Activity> {
        const activity = this.activityRepository.create({
            entityType,
            entityId,
            action,
            description,
        });
        return await this.activityRepository.save(activity);
    }

    async findAll(): Promise<Activity[]> {
        return await this.activityRepository.find({
            order: { date: 'DESC' },
        });
    }

    async findByEntity(entityType: ActivityEntityType, entityId: string): Promise<Activity[]> {
        return await this.activityRepository.find({
            where: { entityType, entityId },
            order: { date: 'DESC' },
        });
    }
}
