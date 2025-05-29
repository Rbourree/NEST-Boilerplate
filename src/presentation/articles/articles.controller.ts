import { Controller, Post, Get, Patch, Delete, Body, Param, HttpStatus, HttpException, UseGuards, Headers, HttpCode } from '@nestjs/common';
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
        private readonly createArticleUseCase: CreateArticleUseCase,
        private readonly getAllArticlesUseCase: GetAllArticlesUseCase,
        private readonly getArticleByIDUseCase: GetArticleByIDUseCase,
        private readonly updateArticleUseCase: UpdateArticleUseCase,
        private readonly deleteArticleUseCase: DeleteArticleUseCase
    ) { }

    @Post('article')
    @UseGuards(JwtAuthGuard)
    async createArticle(@Headers('user') currentUser: any, @Body() data: any) {
        data.author = {}
        data.author.id_user = currentUser.id_user;
        return await this.createArticleUseCase.execute(data);
    }

    @Get('articles')
    @UseGuards(JwtAuthGuard)
    async getAllArticles() {
        return await this.getAllArticlesUseCase.execute();
    }

    @Get('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async getArticleByID(@Param('id_article') id_article: string) {
        const article = await this.getArticleByIDUseCase.execute(id_article);
        if (!article) {
            throw new HttpException(`Article with id ${id_article} not found`, HttpStatus.NOT_FOUND);
        }
        return article;
    }

    @Patch('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async updateArticle(@Param('id_article') id_article: string, @Body() updateArticleDto: any) {
        const updatedArticle = await this.updateArticleUseCase.execute(id_article, updateArticleDto);
        if (!updatedArticle) {
            throw new HttpException(`Article with id ${id_article} not found or update failed`, HttpStatus.NOT_FOUND);
        }
        return updatedArticle;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async deleteArticle(@Param('id_article') id_article: string) {
        const deletedArticle = await this.deleteArticleUseCase.execute(id_article);
        if (!deletedArticle) {
            throw new HttpException(`Article with id ${id_article} not found or deletion failed`, HttpStatus.NOT_FOUND);
        }
    }
}