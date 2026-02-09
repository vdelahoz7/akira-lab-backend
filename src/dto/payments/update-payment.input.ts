import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentInput } from './create-payment.input';

export class UpdatePaymentInput extends PartialType(CreatePaymentInput) { }
