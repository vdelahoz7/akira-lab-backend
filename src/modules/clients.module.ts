import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from '../services/clients.service';
import { ClientsController } from '../controllers/clients.controller';
import { Client } from '../entities/client.entity';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
        forwardRef(() => ProjectsModule),
    ],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService],
})
export class ClientsModule { }
