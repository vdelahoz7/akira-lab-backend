import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../services/projects.service';
import { ProjectsResolver } from '../resolvers/projects.resolver';
import { Project } from '../entities/project.entity';
import { ClientsModule } from './clients.module';
import { PaymentsModule } from './payments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        forwardRef(() => ClientsModule),
        forwardRef(() => PaymentsModule),
    ],
    providers: [ProjectsService, ProjectsResolver],
    exports: [ProjectsService],
})
export class ProjectsModule { }
