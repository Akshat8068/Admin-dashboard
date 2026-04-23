import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';

const baseQuery = retry(fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        headers.set('content-type', 'application/json');
        return headers;
    },
}), { maxRetries: 3 });


export const dummySlice = createApi({
    reducerPath: 'dummyapi',
    baseQuery: baseQuery,
    tagTypes: ['Users', 'Products'],
    refetchOnReconnect: true,
    refetchOnFocus: false,
    endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {
    util: { getRunningQueriesThunk },
} = dummySlice;

// Export the api slice for use in store
export default dummySlice;