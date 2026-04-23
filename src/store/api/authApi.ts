import { apiSlice } from './apiSlice';
import type { User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from '@/types';
import { mockAuthService } from '@/utils/mockAuth';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<{ user: User; tokens: AuthTokens }>, LoginCredentials>({
            
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),

        register: builder.mutation<ApiResponse<{ user: User; tokens: AuthTokens }>, RegisterData>({
           
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth'],
        }),

        

       

        // getCurrentUser: builder.query<ApiResponse<User>, string>({
        //     queryFn: async (token) => {
        //         try {
        //             const data = await mockAuthService.getCurrentUser(token);
        //             return { data };
        //         } catch (error: unknown) {
        //             const err = error as { response?: { data: unknown } };
        //             return { error: err.response?.data || { message: 'Failed to get user' } };
        //         }
        //     },
        //     providesTags: ['Auth'],
        // }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    // useLogoutMutation,
    // useGetCurrentUserQuery,
} = authApi;
