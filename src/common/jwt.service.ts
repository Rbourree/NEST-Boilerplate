import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJWTService } from '@core/shared/jwt.service';

@Injectable()
export class JWTService implements IJWTService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async createRefreshToken(payload: { id_user: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
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
