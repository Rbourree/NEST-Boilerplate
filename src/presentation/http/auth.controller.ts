import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../../core/users/application/services/auth.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        try {
            const user = await this.authService.signIn(signInDto.email, signInDto.password);
            if (!user) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }
            return user;
        } catch (error) {
            console.log('Sign-in error:', error);
            
            throw new HttpException(error.message || 'Sign-in failed', HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            const newUser = await this.authService.signUp(signUpDto.email, signUpDto.password);
            return newUser;
        } catch (error) {
            throw new HttpException(error.message || 'Sign-up failed', HttpStatus.BAD_REQUEST);
        }
    }
} 