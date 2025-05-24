import { Module, Global } from '@nestjs/common';
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from './common/auth.guard';
import { JWTService } from './common/jwt.service';
import { JwtModule } from "@nestjs/jwt";
@Global()
@Module({
  imports: [PrismaModule, UsersModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET || 'default',
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [],
  providers: [JwtAuthGuard, JWTService],
  exports: [JwtAuthGuard, JWTService],
})
export class AppModule { }
