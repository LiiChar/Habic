import { IComment } from '../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAddComment {
    author: string
    text: string; 
    to: number;
    jwtToken?: string
}

interface CommentArr extends IComment  {
    createdAt: string;
    updatedAt: string;
}

interface UpdateComm {
    id: number;
    text: string;
}

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Comments'],
    endpoints: (build) => ({
        fetchAllComments: build.query<CommentArr[], void>({
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
        }),
        updateComment: build.mutation<IComment, UpdateComm>({
            query: (comment) => ({
                url: '/comments',
                method: 'PUT',
                body: comment
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: build.mutation<IComment, {id: number}>({
            query: (comment) => ({
                url: '/comments',
                method: 'DELETE',
                body: comment
            }),
            invalidatesTags: ['Comments']
        })
    })
})


export const {useCreateCommentMutation, useFetchAllCommentsQuery, useDeleteCommentMutation, useUpdateCommentMutation} = commentsApi
