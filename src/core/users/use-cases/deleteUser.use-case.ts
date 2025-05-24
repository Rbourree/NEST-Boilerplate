import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Exécute le cas d'utilisation pour supprimer un utilisateur par son ID.
   * @param id_user - L'ID de l'utilisateur à supprimer.
   * @returns L'utilisateur supprimé ou null s'il n'existe pas.
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