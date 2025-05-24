import { UserRepository } from '../user.repository';
import { User } from "../../domain/user.entity";
import { Hasher } from "../../domain/hasher.interface";
import { TokenService } from "../../domain/token.interface";
import { Inject } from '@nestjs/common';

export class AuthService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('Hasher') private readonly hasher: Hasher,
        @Inject('TokenService') private readonly tokenService: TokenService
    ) { }

    /**
      * Sign in a user with email and password.
      * @param email - The user's email address.
      * @param password - The user's password.
      * @returns The authenticated user.
      * @throws Error if the credentials are invalid.
    */
    async signIn(email: string, password: string): Promise<User & { access: string; refresh: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await this.hasher.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        // Generate access and refresh tokens for the new user
        const payload = { id_user: user.id_user };
        const access = await this.tokenService.createAccessToken(payload);
        const refresh = await this.tokenService.createRefreshToken(payload);
        const refreshHash = await this.hasher.hash(refresh);
        await this.userRepository.updateRefreshToken(user.id_user, refreshHash);
        return Object.assign(user, { access, refresh });
    }

    /**
     * Sign up a new user with email and password.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns The newly created user.
     * @throws Error if the user already exists or if the data is invalid.
     */
    async signUp(email: string, password: string): Promise<User & { access: string; refresh: string }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const pwdHash = await this.hasher.hash(password);
        const createdUser = await this.userRepository.create(email, pwdHash);
        if (!createdUser) {
            throw new Error('Failed to create user');
        }
        // Generate access and refresh tokens for the new user
        const payload = { id_user: createdUser.id_user };
        const access = await this.tokenService.createAccessToken(payload);
        const refresh = await this.tokenService.createRefreshToken(payload);
        const refreshHash = await this.hasher.hash(refresh);
        await this.userRepository.updateRefreshToken(createdUser.id_user, refreshHash);
        return Object.assign(new User(createdUser.id_user, createdUser.email, createdUser.password), { access, refresh });
    }
}
