import { Inject } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class GetAllUsersUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  /**
   * Executes the use case to retrieve all users.
   * @returns The list of users.
   */
  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}