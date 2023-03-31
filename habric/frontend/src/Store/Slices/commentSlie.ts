import { IComment } from '../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAddComment {
    author: string
    text: string; 
    to: number;
    jwtToken?: string
}

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Comments'],
    endpoints: (build) => ({
        fetchAllComments: build.query<IComment[], void>({
            query: () => ({
                url: '/comments'
            }),
            providesTags: result => ['Comments']
        }),
        createComment: build.mutation<IComment, IAddComment>({
            query: (comment) => ({
                url: '/comments',
                method: 'POST',
                body: comment
            }),
            invalidatesTags: ['Comments']
        })
    })
})


export const {useCreateCommentMutation, useFetchAllCommentsQuery} = commentsApi
