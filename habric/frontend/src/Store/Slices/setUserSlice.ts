import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    user: {
        id: number,
        name: string
    },
    vision: boolean
}

interface IUser {
    id: number,
    name: string
}

const initialState: IInitialState = {
    user: {
        id: 0,
        name: 'Bot'
    },
    vision: false
}

export const userSlice = createSlice({
    name: 'setUser',
    initialState,
    reducers: {
        setUser: (state: IInitialState, action: PayloadAction<IUser>): void => {
            state.user = action.payload
        },
        setVision: (state: IInitialState, action: PayloadAction<boolean>) => {
            state.vision = action.payload
        }
    }
})

export default userSlice.reducer
export const {setUser, setVision} = userSlice.actions