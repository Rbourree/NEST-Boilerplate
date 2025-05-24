import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { SignInUseCase } from '../../core/users/use-cases/signin.use-case';
import { SignUpUseCase } from '../../core/users/use-cases/signup.use-case';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly signInService: SignInUseCase, private readonly signUpService: SignUpUseCase) {}

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        try {
            const user = await this.signInService.execute(signInDto.email, signInDto.password);
            if (!user) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
            return user;
        } catch (error) {           
            throw new HttpException(error.message || 'Sign-in failed', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            const newUser = await this.signUpService.execute(signUpDto.email, signUpDto.password);
            return newUser;
        } catch (error) {
            throw new HttpException(error.message || 'Sign-up failed', HttpStatus.BAD_REQUEST);
        }
    }
} 