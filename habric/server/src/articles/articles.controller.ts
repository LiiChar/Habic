import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-articlesdto';
import { CreateArticleDto } from './dto/create-articles.dto';
import { IActicles } from './../types/articles';
import { ArticlesService } from './articles.service';
import { Controller, Get, Post, Delete, Put, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { getArticleDto } from './dto/get-articles.dto';
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('articles')
export class ArticlesController {
    constructor (private articlesService: ArticlesService) {}

    @Get()
    async getAllArticles(): Promise<IActicles[]> {
        return await this.articlesService.getAllArticles()
    }

    @Get(':id')
    async getArticle(@Body() getCommentDto: getArticleDto): Promise<IActicles> {
        return await this.articlesService.getArticlesById(getCommentDto)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createArticle(@Body() createCommentDto: CreateArticleDto, @UploadedFile() file: Express.Multer.File): Promise<IActicles> {
        return await this.articlesService.createArticles(createCommentDto)
    }

    @Delete()
    async deleteArticle(@Body() deleteCommentDto: DeleteArticleDto): Promise<IActicles> {
        return await this.articlesService.deleteArticlesById(deleteCommentDto)
    }

    @Put()
    async updateArticle(@Body() updateCommentDto: UpdateArticleDto): Promise<IActicles> {
        return await this.articlesService.updateArticlesById(updateCommentDto)
    }

}
