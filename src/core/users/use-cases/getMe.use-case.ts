import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class GetMeUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Executes the use case to retrieve the current user.
   * @param id_user - The ID of the user to retrieve.
   * @returns The corresponding user or null if it does not exist.
   */
  async execute(id_user: string): Promise<User | null> {
    const user = await this.userRepository.findById(id_user);
    if (!user) {
      throw new Error(`User with ID ${id_user} not found`);
    }
    return user;
  }
}