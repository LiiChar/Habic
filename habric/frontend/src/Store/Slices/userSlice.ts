
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
        createUsers: build.mutation<string, IAddUser>({
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
                body: user
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {useCreateUsersMutation, useFetchAllUsersQuery, useLoginUserMutation} = usersApi
