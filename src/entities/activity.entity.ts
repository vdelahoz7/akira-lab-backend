import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ActivityEntityType } from '../types/activity-entity-type.enum';
import { ActivityAction } from '../types/activity-action.enum';

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ActivityEntityType,
    })
    entityType: ActivityEntityType;

    @Column()
    entityId: string;

    @Column({
        type: 'enum',
        enum: ActivityAction,
    })
    action: ActivityAction;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    date: Date;
}
