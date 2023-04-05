import { StringDecoder } from 'string_decoder';
import { IActicles } from '../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAddArticle {
    author: string;
    name: string;
    tags: string;
    text?: string;
    jwtToken?: string
}

interface IUpdateArticle {
    author: string;
    name: string;
    tags: string;
    text?: string;
    jwtToken?: string
}

export interface UpdateArticle {
    id: number;
    author?: string;
    text?: string;
    name?: string;
    watcher?: number;
    image?: string;
    tags?: string;
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
        getArticleById: build.query<IActicles, string | undefined>({
            query: (id) => ({
                url: `/articles/${id}`
            }),
            providesTags: result => ['Articles']
        }),
        getArticleByName: build.query<IActicles[], string | undefined>({
            query: (username) => ({
                url: `/articles/articles/${username}`
            }),
            providesTags: result => ['Articles']
        }),
        createArticle: build.mutation<IActicles, IAddArticle>({
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: article
            }),
            invalidatesTags: ['Articles']
        }),
        updateArticle: build.mutation<IActicles, UpdateArticle>({
            query: (article) => ({
                url: '/articles',
                method: 'PUT',
                body: article
            }),
            invalidatesTags: ['Articles']
        }),
        deleteArticle: build.mutation<IAddArticle, string | undefined>({
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'DELETE',   
            }),
            invalidatesTags: ['Articles']
        })
    })
})

export const {useCreateArticleMutation, useFetchAllArticlesQuery, useUpdateArticleMutation, useGetArticleByIdQuery, useDeleteArticleMutation,useGetArticleByNameQuery } = articlesApi



