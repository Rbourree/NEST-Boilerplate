import { UserRepository } from '../user.repository';
import { User } from "../../domain/user.entity";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

    /**
    * Find a user by id_user.
    * @param id_user - The user's id_user.
    * @returns The user.
    * @throws Error if the user is not found.
    */
    async findById(id_user: string): Promise<User | null> {
        return await this.userRepository.findById(id_user);
    }

    /**
    * Update a user.
    * @param user - The user to update.
    * @returns The updated user.
    * @throws Error if the user is not found.
    */
    async update(id_user: string, user: User): Promise<User | null> {
        return await this.userRepository.update(id_user, user);
    }

    /**
    * Delete a user by id_user.
    * @param id_user - The user's id_user.
    * @returns The deleted user.
    * @throws Error if the user is not found.
    */
    async delete(id_user: string): Promise<void> {
        return await this.userRepository.delete(id_user);
    }

    /**
    * Find all users.
    * @returns The users.
    * @throws Error if the users are not found.
    */
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

}
