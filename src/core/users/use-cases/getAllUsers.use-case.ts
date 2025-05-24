import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Exécute le cas d'utilisation pour récupérer tous les utilisateurs.
   * @returns La liste des utilisateurs.
   */
  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}