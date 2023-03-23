import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-articlesdto';
import { CreateArticleDto } from './dto/create-articles.dto';
import { getArticleDto } from './dto/get-articles.dto';
import { IActicles } from './../types/articles';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
    private readonly articles: IActicles[] = [{author: 'bot', id: 1, image: 'dfs', name: 'fsd', tags: ['sdff0'], text: 'sdff', watcher: 0}]

    getAllArticles(): IActicles[] {
        return this.articles
    }

    getArticlesById(getArticlesDto: getArticleDto): IActicles {
        return this.articles.find((article) => article.id === getArticlesDto.id)
    }

    createArticles(createarticlesDto: CreateArticleDto): IActicles {
        const id = this.articles.at(-1).id + 1 || 0;
        const watcher = 0;
        const newarticles = {id, watcher, image: '1', ...createarticlesDto}
        this.articles.push(newarticles)
        return newarticles
    }

    deleteArticlesById(deleteArticlesDto: DeleteArticleDto): IActicles {
        const articlesIndex = this.articles.findIndex((articles) => articles.id === deleteArticlesDto.id)
        const articles = this.articles[articlesIndex]
        const delArticles = this.articles.splice(articlesIndex)
        return articles
    }

    updateArticlesById(updateArticlesDto: UpdateArticleDto): IActicles {
        const articlesIndex = this.articles.findIndex((articles) => articles.id === updateArticlesDto.id)
        const articles:IActicles = this.articles[articlesIndex]
        const updatedArticles:IActicles = {id: articles.id, 
            author: updateArticlesDto.author || articles.author, 
            text: updateArticlesDto.text || articles.text, 
            image: updateArticlesDto.name ||  articles.image, 
            name: updateArticlesDto.name ||  articles.name,
            tags: updateArticlesDto.tags ||  articles.tags,
            watcher: updateArticlesDto.watcher ||  articles.watcher,
        }
        this.articles[articlesIndex] = updatedArticles
        return updatedArticles;
    }
}
