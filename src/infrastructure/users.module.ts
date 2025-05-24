// Framework: NestJS
import { Module } from '@nestjs/common';

// Common layer imports
import { BcryptHasher } from '../common/bcrypt.service';
import { JWTService } from '../common/jwt.service';

// Application layer imports
import { UserRepository } from 'src/core/users/application/user.repository';
import { UsersService } from '../core/users/application/services/users.service';
import { AuthService } from '../core/users/application/services/auth.service';

// Domain layer imports
import { TokenService } from 'src/core/users/domain/token.interface';
import { Hasher } from 'src/core/users/domain/hasher.interface';

// Infrastructure layer imports
import { UsersController } from "../presentation/http/users.controller";
import { AuthController } from "../presentation/http/auth.controller";
import { UsersRepositoryPrisma } from './repositories/users.prisma.repository';

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
    {
      provide: UsersService,
      useFactory: (repo: UserRepository) => new UsersService(repo),
      inject: ['UserRepository']
    },
    {
      provide: AuthService,
      useFactory: (repo: UserRepository, hasher: Hasher, tokenService: TokenService) => new AuthService(repo, hasher, tokenService),
      inject: ['UserRepository', 'Hasher', 'TokenService']
    }
  ],
})
export class UsersModule { }
