import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from '../controllers/projects.controller';
import { Project } from '../entities/project.entity';
import { ClientsModule } from './clients.module';
import { IncomesModule } from './incomes.module';
import { ActivitiesModule } from './activities.module';
import { NotificationsModule } from './notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        forwardRef(() => ClientsModule),
        forwardRef(() => IncomesModule),
        ActivitiesModule,
        NotificationsModule,
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule { }
