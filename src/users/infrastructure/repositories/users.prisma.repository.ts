import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserRepository } from '../../core/application/user.repository';
import { User } from '../../core/domain/user.entity';

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
        return new User(user.id_user, user.email, user.password);
    }

    async findById(id_user: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id_user },
        });
        if (!user) throw new Error(`User with id ${id_user} not found`);
        return new User(user.id_user, user.email, user.password);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) return null;
        return new User(user.id_user, user.email, user.password);
    }

    async update(id_user: string, user: User): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id_user: id_user },
            data: {
                email: user.email,
                password: user.password,
            },
        }).catch((error) => {
            throw new Error(`Failed to update user: ${error.message}`);
        });
        return new User(updatedUser.id_user, updatedUser.email, updatedUser.password);
    }

    async updateRefreshToken(id_user: string, refreshToken: string): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id_user },
            data: {
                refreshToken,
            },
        }).catch((error) => {
            throw new Error(`Failed to update refresh token: ${error.message}`);
        });
        return new User(updatedUser.id_user, updatedUser.email, updatedUser.password);
    }

    async delete(id_user: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id_user },
        });
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((user) => new User(user.id_user, user.email, user.password));
    }

}
