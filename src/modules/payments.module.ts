import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from '../services/payments.service';
import { PaymentsController } from '../controllers/payments.controller';
import { Payment } from '../entities/payment.entity';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
        forwardRef(() => ProjectsModule),
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [PaymentsService],
})
export class PaymentsModule { }
