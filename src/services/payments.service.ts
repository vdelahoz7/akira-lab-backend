import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentInput } from '../dto/payments/create-payment.input';
import { UpdatePaymentInput } from '../dto/payments/update-payment.input';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) { }

    async create(createPaymentInput: CreatePaymentInput): Promise<Payment> {
        const payment = this.paymentRepository.create(createPaymentInput);
        return await this.paymentRepository.save(payment);
    }

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find({
            relations: ['project'],
            order: { date: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['project'],
        });
        if (!payment) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        return payment;
    }

    async findByProject(projectId: string): Promise<Payment[]> {
        return await this.paymentRepository.find({
            where: { projectId },
            order: { date: 'DESC' },
        });
    }

    async update(id: string, updatePaymentInput: UpdatePaymentInput): Promise<Payment> {
        const payment = await this.findOne(id);
        Object.assign(payment, updatePaymentInput);
        return await this.paymentRepository.save(payment);
    }

    async remove(id: string): Promise<boolean> {
        const payment = await this.findOne(id);
        await this.paymentRepository.remove(payment);
        return true;
    }
}
