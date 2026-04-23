import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { authSlice } from './slices/authSlice';
import { apiSlice } from './api/apiSlice';
import dummySlice from './api/dummySlice';

const errorMiddleware = () => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
        const status = action.payload?.status;

        if (status === 401) {
            toast.error('Session expired. Please login again.');
        } else if (status === 403) {
            toast.error('Access denied.');
        } else if (status === 500) {
            toast.error('Server error. Please try again later.');
        } else if (status === 404) {
            toast.error('Resource not found.');
        } else if (status === 'FETCH_ERROR') {
            toast.error('Network error. Check your connection.');
        }
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        api: apiSlice.reducer,
        dummyapi: dummySlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(apiSlice.middleware, dummySlice.middleware, errorMiddleware),
    devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { login, logout } = authSlice.actions;
