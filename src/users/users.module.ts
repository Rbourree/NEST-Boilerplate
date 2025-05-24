import { Module } from '@nestjs/common';
import { UserService } from './core/application/services/user.service';
import { AuthService } from './core/application/services/auth.service';
import { BcryptHasher } from './infrastructure/services/bcrypt.hasher';
import { JwtTokenService } from './infrastructure/services/jwt.token.service';
import { JwtModule  } from "@nestjs/jwt";
import { UsersRepositoryPrisma } from './infrastructure/repositories/users.prisma.repository';
import { AuthController } from "./presentation/http/auth.controller";


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    {
      provide: 'UserRepository',
      useClass: UsersRepositoryPrisma,
    },
    {
      provide: 'Hasher',
      useClass: BcryptHasher,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
})
export class UsersModule {}
