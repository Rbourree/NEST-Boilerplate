import { Module } from '@nestjs/common';
import { UsersService } from './core/application/services/users.service';
import { AuthService } from './core/application/services/auth.service';
import { BcryptHasher } from '../common/bcrypt.service';
import { JWTService } from '../common/jwt.service';
import { UsersRepositoryPrisma } from './infrastructure/repositories/users.prisma.repository';
import { AuthController } from "./presentation/http/auth.controller";
import { UsersController } from "./presentation/http/users.controller";


@Module({
  imports: [],
  controllers: [AuthController, UsersController],
  providers: [
    UsersService,
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
      useClass: JWTService,
    },
  ],
})
export class UsersModule {}
