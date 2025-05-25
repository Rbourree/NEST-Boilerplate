import { UserRepository } from '../user.repository';
import { User } from "../user.entity";
import { IBcryptService } from "../../shared/bcrypt.interface";
import { IJWTService } from "../../shared/jwt.interface";


export interface SignInResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

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
    async execute(email: string, password: string): Promise<SignInResponse> {

        const user = await this.userRepository.findByEmail(email);
        
        if (!user || !(await this.bcryptService.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        // Generate access and refresh tokens for the new user
        const payload = { id_user: user.id_user.getValue() };
        const accessToken = await this.jwtService.createAccessToken(payload);
        const refreshToken = await this.jwtService.createRefreshToken(payload);
        const refreshHash = await this.bcryptService.hash(refreshToken);

        await this.userRepository.updateRefreshToken(user.id_user.getValue(), refreshHash);

        return { user, accessToken, refreshToken };
    }
}