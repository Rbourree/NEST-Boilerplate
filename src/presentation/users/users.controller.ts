import { Controller, Get, Headers, UseGuards, HttpStatus, HttpException, Param, Patch, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from '@common/auth.guard';

import { 
    GetMeUseCase, 
    GetUserByIDUseCase, 
    UpdateUserUseCase, 
    GetAllUsersUseCase,
    DeleteUserUseCase
} from '@core/users/use-cases'

@Controller()
export class UsersController {
    constructor(
        private readonly getMeUseCase: GetMeUseCase,
        private readonly getUserByIDUseCase: GetUserByIDUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    @Get('/user/me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Headers('user') currentUser: any) {
        const user = await this.getMeUseCase.execute(currentUser.id_user);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Get('/user/:id_user')
    @UseGuards(JwtAuthGuard)
    async getByID(@Param('id_user') id_user: string) {
        const user = await this.getUserByIDUseCase.execute(id_user);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Get('/users')
    @UseGuards(JwtAuthGuard)
    async getAll() {
        return await this.getAllUsersUseCase.execute();
    }

    @Patch('/user/:id_user')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id_user') id_user: string, @Body() payload: any, @Headers('user') currentUser: any) {
        if (id_user !== currentUser.id_user) {
            throw new HttpException('You can only update your own user', HttpStatus.FORBIDDEN);
        }
        const updatedUser = await this.updateUserUseCase.execute(id_user, payload);
        if (!updatedUser) {
            throw new HttpException('User not found or update failed', HttpStatus.NOT_FOUND);
        }
        return updatedUser;
    }

    @Delete('/user/:id_user')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id_user') id_user: string, @Headers('user') currentUser: any) {
        if (id_user !== currentUser.id_user) {
            throw new HttpException('You can only delete your own user', HttpStatus.FORBIDDEN);
        }
        let user =await this.deleteUserUseCase.execute(id_user);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User deleted successfully' };
    }
}