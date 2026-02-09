import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../services/projects.service';
import { ProjectsController } from '../controllers/projects.controller';
import { Project } from '../entities/project.entity';
import { ClientsModule } from './clients.module';
import { PaymentsModule } from './payments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        forwardRef(() => ClientsModule),
        forwardRef(() => PaymentsModule),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule { }
