import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Notification } from './notification.entity';
import { ClientStatus } from '../types/client-status.enum';
import { ClientSource } from '../types/client-source.enum';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({
        type: 'enum',
        enum: ClientSource,
        default: ClientSource.MANUAL,
    })
    source: ClientSource;

    @Column({
        type: 'enum',
        enum: ClientStatus,
        default: ClientStatus.NEW,
    })
    status: ClientStatus;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @Column({ type: 'text', nullable: true })
    notes: string;

    @OneToMany(() => Project, (project) => project.client)
    projects: Project[];

    @OneToMany(() => Notification, (notification) => notification.client)
    notifications: Notification[];

    @CreateDateColumn()
    createdAt: Date;
}
