import { Module, Global } from '@nestjs/common';
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { JwtAuthGuard } from './common/auth.guard';
import { JWTService } from './common/jwt.service';
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "./presentation/users/users.module";
import { ArticlesModule } from './presentation/articles/articles.module';
@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default',
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule, UsersModule, ArticlesModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard, JWTService],
  exports: [JwtAuthGuard, JWTService],
})
export class AppModule {}
