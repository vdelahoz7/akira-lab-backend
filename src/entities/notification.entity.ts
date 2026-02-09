import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Client } from './client.entity';

@Entity('notifications')
@ObjectType()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    message: string;

    @Column({ default: false })
    @Field()
    isRead: boolean;

    @Column({ nullable: true })
    @Field({ nullable: true })
    clientId: string;

    @ManyToOne(() => Client, (client) => client.notifications, { nullable: true })
    @Field(() => Client, { nullable: true })
    client: Client;

    @CreateDateColumn()
    @Field()
    createdAt: Date;
}
