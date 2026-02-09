import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../dto/auth/login.input';
import { RegisterInput } from '../dto/auth/register.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
