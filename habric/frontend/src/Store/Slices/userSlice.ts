
import { IUser } from './../../types/acticles';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IAddUser {
    name: string,
    password: string
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
        createUsers: build.mutation<IUser, IAddUser>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {useCreateUsersMutation, useFetchAllUsersQuery} = usersApi
