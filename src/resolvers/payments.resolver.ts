import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentInput } from '../dto/payments/create-payment.input';
import { UpdatePaymentInput } from '../dto/payments/update-payment.input';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';

@Resolver(() => Payment)
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('admin')
export class PaymentsResolver {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly projectsService: ProjectsService,
    ) { }

    @Mutation(() => Payment)
    createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
        return this.paymentsService.create(createPaymentInput);
    }

    @Query(() => [Payment], { name: 'payments' })
    findAll() {
        return this.paymentsService.findAll();
    }

    @Query(() => Payment, { name: 'payment' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.paymentsService.findOne(id);
    }

    @Mutation(() => Payment)
    updatePayment(
        @Args('id', { type: () => ID }) id: string,
        @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
    ) {
        return this.paymentsService.update(id, updatePaymentInput);
    }

    @Mutation(() => Boolean)
    removePayment(@Args('id', { type: () => ID }) id: string) {
        return this.paymentsService.remove(id);
    }

    @ResolveField(() => Project)
    project(@Parent() payment: Payment) {
        return this.projectsService.findOne(payment.projectId);
    }
}
