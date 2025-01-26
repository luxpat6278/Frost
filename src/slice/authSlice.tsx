import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

interface TokenInfo {
    accessToken: string;
    expiresIn: number;
}

interface AuthState {
    tokenInfo: TokenInfo | null;
    user: any;
}

const initialState: AuthState = {
    tokenInfo: JSON.parse(localStorage.getItem('tokenInfo') || 'null'),
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokenInfo(state, action: PayloadAction<TokenInfo | null>) {
            state.tokenInfo = action.payload;
        },
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        clearAuth(state) {
            state.tokenInfo = null;
            state.user = null;
            localStorage.removeItem('tokenInfo');
        },
    },
});

export const { setTokenInfo, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
