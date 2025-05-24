import { User } from './user.entity';

export abstract class UserRepository {
constructor() {}
    /**
     * Signs in a user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns A promise that resolves to the signed-in user, or null if not found.
     */
    abstract create(email: string, password: string): Promise<User>;


    /**
     * Finds a user by their ID.
     * @param id - The ID of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */
    abstract findById(id: string): Promise<User | null>;

    /**
     * Finds a user by their email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */
    abstract findByEmail(email: string): Promise<User | null>;

    /**
     * Finds all users.
     * @returns A promise that resolves to an array of users.
     */
    abstract findAll(): Promise<User[]>;

    /**
     * Deletes a user by their ID.
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves when the user is deleted.
     */
    abstract delete(id: string): Promise<void>;

    /**
     * Updates a user.
     * @param user - The user to update.
     * @returns A promise that resolves to the updated user.
     */
    abstract update(id_user: string, user: User): Promise<User | null>;

    /**
     * Updates the refresh token for a user.
     * @param id_user - The ID of the user to update.
     * @param refreshToken - The new refresh token.
     * @returns A promise that resolves to the updated user.
     */
    abstract updateRefreshToken(id_user: string, refreshToken: string): Promise<User | null>;
}
