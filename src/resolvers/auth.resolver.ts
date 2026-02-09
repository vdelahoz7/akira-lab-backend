import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterInput } from '../dto/auth/register.input';
import { LoginInput } from '../dto/auth/login.input';
import { ChangePasswordInput } from '../dto/auth/change-password.input';
import { AuthResponse } from '../dto/auth/auth-response';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Admin } from '../entities/admin.entity';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthResponse)
    register(@Args('registerInput') registerInput: RegisterInput) {
        return this.authService.register(registerInput);
    }

    @Mutation(() => AuthResponse)
    login(@Args('loginInput') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    changePassword(
        @CurrentUser() admin: Admin,
        @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    ) {
        return this.authService.changePassword(admin.id, changePasswordInput);
    }
}
