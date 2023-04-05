import React from 'react'
import { useFetchAllArticlesQuery } from '../../Store/Slices/articlesSlice'
import { Article } from './Article'
import { IActicles } from '../../types/acticles'

export const Articles = () => {
    const {data: articles} = useFetchAllArticlesQuery()

    return (
        <div className='flex justify-center items-center'>
            <div className='w-10/12 mt-6 mb-6'>
                {
                    articles?.map((article: IActicles) => (
                        <Article key={article.id} type='article' article={article}></Article>
                    ))
                }
            </div>
        </div>
    )
}
