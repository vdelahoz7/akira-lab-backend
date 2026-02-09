import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from '../services/clients.service';
import { ClientsResolver } from '../resolvers/clients.resolver';
import { Client } from '../entities/client.entity';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
        forwardRef(() => ProjectsModule),
    ],
    providers: [ClientsService, ClientsResolver],
    exports: [ClientsService],
})
export class ClientsModule { }
