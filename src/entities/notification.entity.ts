import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @Column({ default: false })
    isRead: boolean;

    @Column({ nullable: true })
    clientId: string;

    @ManyToOne(() => Client, (client) => client.notifications, { nullable: true })
    client: Client;

    @CreateDateColumn()
    createdAt: Date;
}
