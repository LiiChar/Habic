import React from 'react'
import { useFetchAllArticlesQuery } from '../../Store/Slices/articlesSlice'
import { Article } from './Article'

export const Articles = () => {
    const {data: articles} = useFetchAllArticlesQuery()

    console.log(articles);
    

    return (
        <div className='flex justify-center items-center'>
            <div className='w-10/12 mt-6 mb-6'>
                {
                    articles?.map((article) => (
                        <Article key={article.id} article={article}></Article>
                    ))
                }
            </div>
        </div>
    )
}
