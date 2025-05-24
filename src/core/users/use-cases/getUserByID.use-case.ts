import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

export class GetUserByIDUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Exécute le cas d'utilisation pour récupérer un utilisateur par son ID.
   * @param id_user - L'ID de l'utilisateur à récupérer.
   * @returns L'utilisateur correspondant ou null s'il n'existe pas.
   */
  async execute(id_user: string): Promise<User | null> {
    return this.userRepository.findById(id_user);
  }
}