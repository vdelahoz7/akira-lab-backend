import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from '../services/payments.service';
import { PaymentsResolver } from '../resolvers/payments.resolver';
import { Payment } from '../entities/payment.entity';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
        forwardRef(() => ProjectsModule),
    ],
    providers: [PaymentsService, PaymentsResolver],
    exports: [PaymentsService],
})
export class PaymentsModule { }
