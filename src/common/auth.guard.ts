import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { JWTService } from '@common/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: JWTService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('No Bearer token in Authorization header');
    }

    const token = auth.split(' ')[1];
    let payload;
    try {
      payload = await this.tokenService.verifyToken(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req.headers['user'] = payload;

    return true;
  }
}