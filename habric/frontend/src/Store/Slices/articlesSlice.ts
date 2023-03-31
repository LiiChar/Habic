import { IActicles } from '../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAddArticle {
    author: string;
    name: string;
    tags: string;
    text?: string;
}

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Articles'],
    endpoints: (build) => ({
        fetchAllArticles: build.query<IActicles[], void>({
            query: () => ({
                url: '/articles'
            }),
            providesTags: result => ['Articles']
        }),
        createArticle: build.mutation<IActicles, IAddArticle>({
            query: (comment) => ({
                url: '/articles',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Articles']
        })
    })
})

export const {useCreateArticleMutation, useFetchAllArticlesQuery} = articlesApi



