// Framework: NestJS
import { Module } from '@nestjs/common';

// Common layer imports
import { BcryptService } from '../../common/bcrypt.service';
import { JWTService } from '../../common/jwt.service';

// Infrastructure layer imports
import { UsersController } from "./users.controller";
import { AuthController } from "./auth.controller";
import { UsersRepositoryPrisma } from '../../infrastructure/repositories/users.prisma.repository';

// UseCases
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
    SignInUseCase,
    SignUpUseCase,
    GetMeUseCase,
    GetUserByIDUseCase,
    UpdateUserUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,

  ],
  exports: [],
})
export class UsersModule { }
