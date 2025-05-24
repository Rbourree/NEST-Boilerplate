// Framework: NestJS
import { Module } from '@nestjs/common';

// Infrastructure layer imports
import { ArticlesController } from "./articles.controller";
import { ArticlesRepositoryPrisma } from '../../infrastructure/repositories/articles.prisma.repository';

// Core layer imports
import { ArticleRepository } from 'src/core/articles/article.repository';
import {
    CreateArticleUseCase,
    UpdateArticleUseCase,
    GetArticleByIDUseCase,
    GetAllArticlesUseCase,
    DeleteArticleUseCase
} from "../../core/articles/use-cases"



@Module({
    imports: [],
    controllers: [ArticlesController],
    providers: [
        ArticlesRepositoryPrisma,
        {
            provide: 'ArticleRepository',
            useClass: ArticlesRepositoryPrisma,
        },
        {
            provide: CreateArticleUseCase,
            useFactory: (repo: ArticleRepository) => new CreateArticleUseCase(repo),
            inject: ['ArticleRepository']
        },
        {
            provide: UpdateArticleUseCase,
            useFactory: (repo: ArticleRepository) => new UpdateArticleUseCase(repo),
            inject: ['ArticleRepository']
        },
        {
            provide: GetArticleByIDUseCase,
            useFactory: (repo: ArticleRepository) => new GetArticleByIDUseCase(repo),
            inject: ['ArticleRepository']
        },
        {
            provide: GetAllArticlesUseCase,
            useFactory: (repo: ArticleRepository) => new GetAllArticlesUseCase(repo),
            inject: ['ArticleRepository']
        },
        {
            provide: DeleteArticleUseCase,
            useFactory: (repo: ArticleRepository) => new DeleteArticleUseCase(repo),
            inject: ['ArticleRepository']
        },
    ],
})
export class ArticlesModule { }
