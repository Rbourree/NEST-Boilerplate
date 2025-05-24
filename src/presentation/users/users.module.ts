// Framework: NestJS
import { Module } from '@nestjs/common';

// Common layer imports
import { BcryptService } from '../../common/bcrypt.service';
import { JWTService } from '../../common/jwt.service';

// Infrastructure layer imports
import { UsersController } from "./users.controller";
import { AuthController } from "./auth.controller";
import { UsersRepositoryPrisma } from '../../infrastructure/repositories/users.prisma.repository';

// Core layer imports
import { UserRepository } from 'src/core/users/user.repository';
import { IJWTService } from 'src/core/shared/jwt.interface';
import { IBcryptService } from 'src/core/shared/bcrypt.interface';
import {
  SignInUseCase,
  SignUpUseCase,
  GetMeUseCase,
  GetUserByIDUseCase,
  UpdateUserUseCase,
  GetAllUsersUseCase,
  DeleteUserUseCase
} from "../../core/users/use-cases";



@Module({
  imports: [],
  controllers: [AuthController, UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UsersRepositoryPrisma,
    },
    {
      provide: 'IBcryptService',
      useClass: BcryptService,
    },
    {
      provide: 'IJWTService',
      useClass: JWTService,
    },
    {
      provide: SignInUseCase,
      useFactory: (repo: UserRepository, hasher: IBcryptService, tokenService: IJWTService) => new SignInUseCase(repo, hasher, tokenService),
      inject: ['UserRepository', 'IBcryptService', 'IJWTService']
    },
    {
      provide: SignUpUseCase,
      useFactory: (repo: UserRepository, hasher: IBcryptService, tokenService: IJWTService) => new SignUpUseCase(repo, hasher, tokenService),
      inject: ['UserRepository', 'IBcryptService', 'IJWTService']
    },
    {
      provide: GetMeUseCase,
      useFactory: (repo: UserRepository) => new GetMeUseCase(repo),
      inject: ['UserRepository']
    },
    {
      provide: GetUserByIDUseCase,
      useFactory: (repo: UserRepository) => new GetUserByIDUseCase(repo),
      inject: ['UserRepository']
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo),
      inject: ['UserRepository']
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (repo: UserRepository) => new GetAllUsersUseCase(repo),
      inject: ['UserRepository']
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo),
      inject: ['UserRepository']
    }
  ],
})
export class UsersModule { }
