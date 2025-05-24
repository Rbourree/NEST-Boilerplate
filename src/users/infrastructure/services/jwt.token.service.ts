import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../core/domain/token.interface';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '1h' });
  }

  async createRefreshToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' });
  }
}
