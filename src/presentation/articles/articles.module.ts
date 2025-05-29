// Framework: NestJS
import { Module } from '@nestjs/common';

// Infrastructure layer imports
import { ArticlesController } from "./articles.controller";
import { ArticlesRepositoryPrisma } from '../../infrastructure/repositories/articles.prisma.repository';

// Use-cases
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
        CreateArticleUseCase,
        UpdateArticleUseCase,
        GetArticleByIDUseCase,
        GetAllArticlesUseCase,
        DeleteArticleUseCase
    ],
})
export class ArticlesModule { }
