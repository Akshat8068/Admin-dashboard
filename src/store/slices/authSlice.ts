import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthTokens } from '@/types';
import { isTokenExpired } from '@/utils';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const getInitialState = (): AuthState => {
    if (typeof window === 'undefined') {
        return { user: null, accessToken: null,  isAuthenticated: false, isLoading: false, error: null };
    }
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    const isTokenValid = storedToken && !isTokenExpired(storedToken);
    return {
        user: storedUser && isTokenValid ? JSON.parse(storedUser) : null,
        accessToken: isTokenValid ? storedToken : null,
        isAuthenticated: Boolean(isTokenValid),
        isLoading: false,
        error: null,
    };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
        setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
        login: (state, action: PayloadAction<{ user: User; tokens: AuthTokens }>) => {
            const { user, tokens } = action.payload;
            state.user = user;
            state.accessToken = tokens.accessToken;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', tokens.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setTokens: (state, action: PayloadAction<AuthTokens>) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', action.payload.accessToken);
            }
        },
        clearAuth: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            }
        },
    },
});

export const { setLoading, setError, login, logout, setUser, setTokens, clearAuth } = authSlice.actions;
