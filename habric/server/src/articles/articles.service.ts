import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-articlesdto';
import { CreateArticleDto } from './dto/create-articles.dto';
import { getArticleDto } from './dto/get-articles.dto';
import { IActicles } from './../types/articles';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles } from './articles.model';
import { GetArticlesDto } from './dto/get-articleses.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Articles) private articlesModel: typeof Articles){}

    getAllArticles(): Promise<IActicles[]> {
        return this.articlesModel.findAll()
    }

    getArticlesById(getArticlesDto: getArticleDto): Promise<IActicles> {
        const id: number = getArticlesDto.id
        return this.articlesModel.findOne({where: {id}})
    }

    getArticlesByName(getArticlesDto: GetArticlesDto): Promise<IActicles[]> {
        const author: string = getArticlesDto.username;
        return this.articlesModel.findAll({where: {author}})
    }

    createArticles(createarticlesDto: CreateArticleDto): Promise<IActicles> {
        return this.articlesModel.create({
            author: createarticlesDto.author, 
            text: createarticlesDto.text,
            name: createarticlesDto.name,
            image: createarticlesDto.image,
            tags: createarticlesDto.tags
        })
    }
    async deleteArticlesById(deleteArticlesDto: DeleteArticleDto): Promise<IActicles> {
        const id = deleteArticlesDto.id
        const delArticle = await this.articlesModel.findOne({
            where: {
                id
            }
        })
        await this.articlesModel.destroy({
            where: {
                id
            }
        })
        return delArticle
    }
    updateArticlesById(updateArticlesDto: UpdateArticleDto): Promise<IActicles> {
        const id = updateArticlesDto.id
        delete updateArticlesDto.id
        this.articlesModel.update(
            updateArticlesDto,
            {
                where: {
                    id
                }
            }
        )
        return this.articlesModel.findOne({where: {id}});
    }
}
