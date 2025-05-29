import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleRepository } from '@core/articles/article.repository';
import { Article } from '@core/articles/article.entity';

@Injectable()
export class ArticlesRepositoryPrisma implements ArticleRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(article: Article): Promise<Article> {
        const createdArticle = await this.prisma.article.create({
            data: {
                title: article.title,
                content: article.content,
                id_user: article.id_user,
            },
        });
        return Article.create(createdArticle);
    }

    async findById(id_article: string): Promise<Article | null> {
        const article = await this.prisma.article.findUnique({
            where: { id_article },
        });
        return article ? Article.create(article) : null;
    }

    async findAll(): Promise<Article[]> {
        const articles = await this.prisma.article.findMany();
        return articles.map((article) => Article.create(article));
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
        return updatedArticle ? Article.create(updatedArticle) : null;
    }

}
