import { Inject } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from "../user.entity";
import { IBcryptService } from "../../shared/bcrypt.service";
import { IJWTService } from "../../shared/jwt.service";

export interface SignUpResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class SignUpUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('IBcryptService') private readonly bcryptService: IBcryptService,
        @Inject('IJWTService') private readonly jwtService: IJWTService
    ) { }

    /**
     * Sign up a new user with email and password.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns The newly created user.
     * @throws Error if the user already exists or if the data is invalid.
     */
    async execute(email: string, password: string): Promise<SignUpResponse> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const pwdHash = await this.bcryptService.hash(password);
        const createdUser = await this.userRepository.create(email, pwdHash);
        if (!createdUser) {
            throw new Error('Failed to create user');
        }
        // Generate access and refresh tokens for the new user
        const payload = { id_user: createdUser.id_user };
        const accessToken = await this.jwtService.createAccessToken(payload);
        const refreshToken = await this.jwtService.createRefreshToken(payload);
        const refreshHash = await this.bcryptService.hash(refreshToken);
        await this.userRepository.updateRefreshToken(createdUser.id_user, refreshHash);

        return { user: createdUser, accessToken, refreshToken };
    }
}