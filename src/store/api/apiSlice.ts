import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        headers.set('content-type', 'application/json');
        return headers;
    },
});


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Auth','Products'],
    endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {
    util: { getRunningQueriesThunk },
} = apiSlice;

// Export the api slice for use in store
export default apiSlice;