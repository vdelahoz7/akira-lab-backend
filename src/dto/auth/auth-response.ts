import { Admin } from '../../entities/admin.entity';

export class AuthResponse {
  accessToken: string;
  admin: Admin;
}
