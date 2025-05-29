import { Inject } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class GetUserByIDUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  /**
   * Executes the use case to retrieve a user by their ID.
   * @param id_user - The ID of the user to retrieve.
   * @returns The corresponding user or null if it does not exist.
   */
  async execute(id_user: string): Promise<User | null> {
    return this.userRepository.findById(id_user);
  }
}