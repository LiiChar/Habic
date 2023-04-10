
import { IUser } from './../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IAddUser {
    username: string,
    password: string,
    jwtToken?: string
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: '/users'
            }),
            providesTags: result => ['Users']
        }),
        getUserById: build.query<IUser, string>({
            query: (id) => ({
                url: `/users/${id}`
            }),
            providesTags: result => ['Users']
        }),
        getNameByToken: build.mutation<string, void>({
            query: () => ({
                url: '/auth/name',
                method: 'POST',
                headers: {authorization: JSON.parse(sessionStorage.getItem('token') || '')}
            }),
            invalidatesTags: ['Users']
        }),
        getNameByName: build.query<IUser, string>({
            query: (username) => ({
                url: `/users/name/${username}`,
            }),
            providesTags: result => ['Users']
        }),
        getImageByName: build.query<string, string>({
            query: (username) => ({
                url: `/users/image/${username}`,
            }),
            providesTags: result => ['Users']
        }),
        createUsers: build.mutation<string, any>({
            query: (user) => ({
                url: '/auth/registration',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        loginUser: build.mutation<string, IAddUser>({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: {username: user.username, password: user.password}
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {useCreateUsersMutation, useFetchAllUsersQuery, useLoginUserMutation, useGetNameByTokenMutation, useGetUserByIdQuery, useGetNameByNameQuery, useGetImageByNameQuery} = usersApi
