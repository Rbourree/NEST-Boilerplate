import { UserRepository } from '../user.repository';
import { User } from "../user.entity";
import { IBcryptService } from "../bcrypt.interface";
import { IJWTService } from "../jwt.interface";

export class SignInUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: IBcryptService,
        private readonly jwtService: IJWTService
    ) { }

    /**
      * Sign in a user with email and password.
      * @param email - The user's email address.
      * @param password - The user's password.
      * @returns The authenticated user.
      * @throws Error if the credentials are invalid.
    */
    async execute(email: string, password: string): Promise<User & { access: string; refresh: string }> {
        const user = await this.userRepository.findByEmail(email);
        
        if (!user || !(await this.bcryptService.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        // Generate access and refresh tokens for the new user
        const payload = { id_user: user.id_user };
        const access = await this.jwtService.createAccessToken(payload);
        const refresh = await this.jwtService.createRefreshToken(payload);
        const refreshHash = await this.bcryptService.hash(refresh);
        await this.userRepository.updateRefreshToken(user.id_user, refreshHash);
        return Object.assign(user, { access, refresh });
    }
}