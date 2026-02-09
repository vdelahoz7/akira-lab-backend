import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { CreatePaymentInput } from '../dto/payments/create-payment.input';
import { UpdatePaymentInput } from '../dto/payments/update-payment.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    create(@Body() createPaymentInput: CreatePaymentInput) {
        return this.paymentsService.create(createPaymentInput);
    }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentInput: UpdatePaymentInput) {
        return this.paymentsService.update(id, updatePaymentInput);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
}
