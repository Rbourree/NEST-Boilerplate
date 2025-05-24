import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Exécute le cas d'utilisation pour récupérer un utilisateur par son ID.
   * @param id_user - L'ID de l'utilisateur à récupérer.
   * @returns L'utilisateur correspondant ou null s'il n'existe pas.
   */
  async execute(id_user: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findById(id_user);
    if (!user) {
      throw new Error(`User with ID ${id_user} not found`);
    }
    user.update(userData);
    const updatedUser = await this.userRepository.update(id_user, user);
    return updatedUser;
  }
}