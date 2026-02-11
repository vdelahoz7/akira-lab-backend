import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesService } from '../services/incomes.service';
import { IncomesController } from '../controllers/incomes.controller';
import { Income } from '../entities/income.entity';
import { ActivitiesModule } from './activities.module';
import { NotificationsModule } from './notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Income]),
        ActivitiesModule,
        NotificationsModule,
    ],
    controllers: [IncomesController],
    providers: [IncomesService],
    exports: [IncomesService],
})
export class IncomesModule { }
