import { UserRepository } from '../user.repository';
import { User } from "../user.entity";
import { IBcryptService } from "../bcrypt.interface";
import { IJWTService } from "../jwt.interface";

export class SignUpUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: IBcryptService,
        private readonly jwtService: IJWTService
    ) { }

    /**
     * Sign up a new user with email and password.
     * @param email - The user's email address.
     * @param password - The user's password.
     * @returns The newly created user.
     * @throws Error if the user already exists or if the data is invalid.
     */
    async execute(email: string, password: string): Promise<User & { access: string; refresh: string }> {
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
        const access = await this.jwtService.createAccessToken(payload);
        const refresh = await this.jwtService.createRefreshToken(payload);
        const refreshHash = await this.bcryptService.hash(refresh);
        await this.userRepository.updateRefreshToken(createdUser.id_user, refreshHash);
        return Object.assign(new User(createdUser), { access, refresh });
    }
}