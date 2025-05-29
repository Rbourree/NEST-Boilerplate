import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../core/users/user.repository';
import { User } from '../../core/users/user.entity';
@Injectable()
export class UsersRepositoryPrisma implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(email: string, password: string): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                email,
                password,
            },

        }).catch((error) => {
            throw new Error(`Failed to create user: ${error.message}`);
        });
        return User.create(user);
    }

    async findById(id_user: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id_user },
        });
        if (!user) return null;   
        return User.create(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) return null;  
        return User.create(user);
    }

    async update(id_user: string, user: User): Promise<User> {
        
        const updatedUser = await this.prisma.user.update({
            where: { id_user: id_user },
            data: user,

        }).catch((error) => {
            throw new Error(`Failed to update user: ${error.message}`);
        });
        if (!updatedUser) throw new Error(`User with id ${id_user} not found`);

        return User.create(updatedUser);
    }

    async updateRefreshToken(id_user: string, refreshToken: string): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id_user },
            data: {
                refreshToken,
            }
        }).catch((error) => {
            throw new Error(`Failed to update refresh token: ${error.message}`);
        });
        return User.create(updatedUser);
    }

    async delete(id_user: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id_user },
        });
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((user) => User.create(user));
    }

}
