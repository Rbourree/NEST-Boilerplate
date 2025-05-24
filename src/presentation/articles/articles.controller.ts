import { Controller, Post, Get, Patch, Delete, Body, Param, HttpStatus, HttpException, UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth.guard';
import {
    CreateArticleUseCase,
    GetAllArticlesUseCase,
    GetArticleByIDUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase
} from "../../core/articles/use-cases";



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
        try {
            data.id_user = currentUser.id_user;
            return await this.createArticleService.execute(data);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('articles')
    @UseGuards(JwtAuthGuard)
    async getAllArticles() {
        try {
            return await this.getAllArticlesService.execute();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async getArticleByID(@Param('id_article') id_article: string) {
        try {
            const article = await this.getArticleByIDService.execute(id_article);
            if (!article) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }
            return article;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async updateArticle(@Param('id_article') id_article: string, @Body() updateArticleDto: any) {
        try {
            const updatedArticle = await this.updateArticleService.execute(id_article, updateArticleDto);
            if (!updatedArticle) {
                throw new HttpException('Article not found or update failed', HttpStatus.NOT_FOUND);
            }
            return updatedArticle;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('article/:id_article')
    @UseGuards(JwtAuthGuard)
    async deleteArticle(@Param('id_article') id_article: string) {
        try {
            return await this.deleteArticleService.execute(id_article);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}