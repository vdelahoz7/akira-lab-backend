import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Project } from './project.entity';
import { Notification } from './notification.entity';

@Entity('clients')
@ObjectType()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    phone: string;

    @OneToMany(() => Project, (project) => project.client)
    @Field(() => [Project], { nullable: true })
    projects: Project[];

    @OneToMany(() => Notification, (notification) => notification.client)
    @Field(() => [Notification], { nullable: true })
    notifications: Notification[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;
}
