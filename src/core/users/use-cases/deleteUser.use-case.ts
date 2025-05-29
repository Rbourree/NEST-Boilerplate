import { Inject } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class DeleteUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  /**
   * Executes the use case to delete a user by their ID.
   * @param id_user - The ID of the user to delete.
   * @returns The deleted user or null if not found.
   */
  async execute(id_user: string): Promise<User | null> {
    const user = await this.userRepository.findById(id_user);
    if (!user) {
      return null;
    }
    await this.userRepository.delete(id_user);
    return user;
  }
}