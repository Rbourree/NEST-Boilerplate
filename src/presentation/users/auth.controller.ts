import { Controller, Post, Body, HttpStatus, HttpException, HttpCode } from '@nestjs/common';
import { SignInUseCase } from '@core/users/use-cases/signin.use-case';
import { SignUpUseCase } from '@core/users/use-cases/signup.use-case';

import { AuthRequestDto, AuthResponseDto } from './dtos/auth.dto';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly signInService: SignInUseCase, private readonly signUpService: SignUpUseCase) {}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: AuthRequestDto): Promise<AuthResponseDto> {
        try {
            const signinUser = await this.signInService.execute(signInDto.email, signInDto.password);
            if (!signinUser) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
            return signinUser;
        } catch (error) {
            throw new HttpException(error.message || 'Sign-in failed', HttpStatus.UNAUTHORIZED);
        }
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() signUpRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
        try {
            const newUser = await this.signUpService.execute(signUpRequestDto.email, signUpRequestDto.password);
            return newUser;
        } catch (error) {
            throw new HttpException(error.message || 'Sign-up failed', HttpStatus.BAD_REQUEST);
        }
    }
} 