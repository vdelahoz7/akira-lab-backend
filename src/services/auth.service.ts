import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from '../entities/admin.entity';
import { RegisterInput } from '../dto/auth/register.input';
import { LoginInput } from '../dto/auth/login.input';
import { AuthResponse } from '../dto/auth/auth-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const existingAdmin = await this.adminRepository.findOne({ where: {} }); // Solo un admin permitido
    if (existingAdmin) {
      throw new BadRequestException('Ya existe un administrador en el sistema');
    }

    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    const admin = this.adminRepository.create({
      ...registerInput,
      password: hashedPassword,
    });

    await this.adminRepository.save(admin);
    const token = this.jwtService.sign({ id: admin.id, email: admin.email });

    return { accessToken: token, admin };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const admin = await this.adminRepository.findOne({
      where: { email: loginInput.email },
    });
    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({ id: admin.id, email: admin.email });
    return { accessToken: token, admin };
  }

  async validateUser(payload: any): Promise<Admin | null> {
    return await this.adminRepository.findOne({ where: { id: payload.id } });
  }
}
