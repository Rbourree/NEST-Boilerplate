import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJWTService } from '../core/users/jwt.interface';

@Injectable()
export class JWTService implements IJWTService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '1h' });
  }

  async createRefreshToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  
  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
