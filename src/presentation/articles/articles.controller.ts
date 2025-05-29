import { Controller, Post, Get, Patch, Delete, Body, Param, HttpStatus, HttpException, UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from '@common/auth.guard';
import {
    CreateArticleUseCase,
    GetAllArticlesUseCase,
    GetArticleByIDUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase
} from "@core/articles/use-cases";

@Controller()
export class ArticlesController {
    constructor(
        private readonly createArticleService: CreateArticleUseCase,
        private readonly getAllArticlesService: GetAllArticlesUseCase,
        private readonly getArticleByIDService: GetArticleByIDUseCase,
        private readonly updateArticleService: UpdateArticleUseCase,
        private readonly deleteArticleService: DeleteArticleUseCase
    ) { }

    @Post('article')
    @UseGuards(JwtAuthGuard)
    async createArticle(@Headers('user') currentUser: any, @Body() data: any) {
        data.id_user = currentUser.id_user;
        return await this.createArticleService.execute(data);
    }

    @Get('articles')
    @UseGuards(JwtAuthGuard)
    async getAllArticles() {
        return await this.getAllArticlesService.execute();
    }

    @Get('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async getArticleByID(@Param('id_article') id_article: string) {
        const article = await this.getArticleByIDService.execute(id_article);
        if (!article) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
        return article;
    }

    @Patch('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async updateArticle(@Param('id_article') id_article: string, @Body() updateArticleDto: any) {
        const updatedArticle = await this.updateArticleService.execute(id_article, updateArticleDto);
        if (!updatedArticle) {
            throw new HttpException('Article not found or update failed', HttpStatus.NOT_FOUND);
        }
        return updatedArticle;
    }

    @Delete('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async deleteArticle(@Param('id_article') id_article: string) {
        return await this.deleteArticleService.execute(id_article);
    }
}