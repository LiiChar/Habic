import userReducer from './Slices/setUserSlice';
import { articlesApi } from './Slices/articlesSlice';
import { commentsApi } from './Slices/commentSlie';
import { configureStore,  } from "@reduxjs/toolkit";
import { usersApi } from "./Slices//userSlice"


export const store = configureStore({
    reducer: {
        setUser: userReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware).concat(commentsApi.middleware).concat(articlesApi.middleware)
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

