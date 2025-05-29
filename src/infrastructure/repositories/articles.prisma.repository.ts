import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleRepository } from '@core/articles/article.repository';
import { Article } from '@core/articles/article.entity';
import { User } from '@core/users/user.entity';
import { Prisma } from "@prisma/client";


class ArticleMapper {
    static toDomain(articleData: any): Article {
        return Article.create({
            id_article: articleData.id_article,
            title: articleData.title,
            content: articleData.content,
            createdAt: articleData.createdAt,
            updatedAt: articleData.updatedAt,
            author: User.create(articleData.user)
        });
    }

    static toPrisma(articleData: Article): Prisma.ArticleCreateInput {
        return {
            id_article: articleData.id_article,
            title: articleData.title,
            content: articleData.content,
            createdAt: articleData.createdAt,
            updatedAt: articleData.updatedAt,
            user: {
                connect: { id_user: articleData.author?.id_user },  // FK → User
            },
        };
    }
}

@Injectable()
export class ArticlesRepositoryPrisma implements ArticleRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(article: Article): Promise<Article> {
        const createdArticle = await this.prisma.article.create({
            data: ArticleMapper.toPrisma(article),
            include: {
                user: true,
            },
        });

        return ArticleMapper.toDomain(createdArticle);
    }

    async findById(id_article: string): Promise<Article | null> {
        const article = await this.prisma.article.findUnique({
            where: { id_article },
            include: {
                user: true,
            },
        });
        if (!article) {
            return null;
        }

        return ArticleMapper.toDomain(article);
    }

    async findAll(): Promise<Article[]> {
        const articles = await this.prisma.article.findMany({
            include: {
                user: true, // Include the author (User) in the result
            },
        });
        return articles.map((article) => ArticleMapper.toDomain(article));
    }

    async delete(id_article: string): Promise<void> {
        await this.prisma.article.delete({
            where: { id_article },
        });
    }

    async update(id_article: string, article: Article): Promise<Article | null> {
        const updatedArticle = await this.prisma.article.update({
            where: { id_article },
            data: {
                title: article.title,
                content: article.content,
            },
        });
        return updatedArticle ? ArticleMapper.toDomain(updatedArticle) : null;
    }

}
