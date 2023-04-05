import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    user: {
        name: string
    },
    jwtToken: string | undefined,
    vision: boolean
}

interface IUser {
    name: string | 'Bot'
}

const initialState: IInitialState = {
    user: {
        name: 'Bot'
    },
    jwtToken: '',
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
        },
        setJwtToken: (state: IInitialState, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
        }
    }
})

export default userSlice.reducer
export const {setUser, setVision, setJwtToken} = userSlice.actions