import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "@infrastructure/prisma/prisma.module";
import configuration from '@infrastructure/configuration';

import { JwtAuthGuard } from '@common/auth.guard';
import { JWTService } from '@common/jwt.service';

import { UsersModule } from "@presentation/users/users.module";
import { ArticlesModule } from '@presentation/articles/articles.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.accessExpiration },
    }),
    PrismaModule, UsersModule, ArticlesModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard, JWTService],
  exports: [JwtAuthGuard, JWTService],
})
export class AppModule {}
