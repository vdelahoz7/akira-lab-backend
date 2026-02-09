import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Notification } from './notification.entity';

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

    @OneToMany(() => Project, (project) => project.client)
    projects: Project[];

    @OneToMany(() => Notification, (notification) => notification.client)
    notifications: Notification[];

    @CreateDateColumn()
    createdAt: Date;
}
