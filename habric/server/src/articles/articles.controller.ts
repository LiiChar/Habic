import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-articlesdto';
import { CreateArticleDto } from './dto/create-articles.dto';
import { IActicles } from './../types/articles';
import { ArticlesService } from './articles.service';
import { Controller, Get, Post, Delete, Put, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { getArticleDto } from './dto/get-articles.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { GetArticlesDto } from './dto/get-articleses.dto';

@Controller('articles')
export class ArticlesController {
    constructor (private articlesService: ArticlesService) {}

    @Get()
    async getAllArticles(): Promise<IActicles[]> {
        return await this.articlesService.getAllArticles()
    }

    @Get(':id')
    async getArticle(@Param() GetArticleDto: getArticleDto): Promise<IActicles> {
        return await this.articlesService.getArticlesById(GetArticleDto)
    }

    @Get('articles/:username')
    async getArticles(@Param() getArticlesDto: GetArticlesDto): Promise<IActicles[]> {
        return await this.articlesService.getArticlesByName(getArticlesDto)
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createArticle(@Body() createCommentDto: CreateArticleDto, @UploadedFile() image: Express.Multer.File): Promise<IActicles> {
        return await this.articlesService.createArticles(createCommentDto, image)
    }

    @Delete(':id')
    async deleteArticle(@Param() deleteCommentDto: DeleteArticleDto): Promise<IActicles> {
        return await this.articlesService.deleteArticlesById(deleteCommentDto)
    }

    @Put()
    async updateArticle(@Body() updateCommentDto: UpdateArticleDto): Promise<IActicles> {
        return await this.articlesService.updateArticlesById(updateCommentDto)
    }

}
