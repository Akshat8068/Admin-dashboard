import { apiSlice } from './apiSlice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ApiResponse, Product } from '@/types';
import { mockProductService } from '@/utils/mockProduct';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ApiResponse<Product[]>, void>({
            queryFn: async () => {
                try {
                    const data = await mockProductService.getProducts();
                    return { data };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            providesTags: ['Products'],
        }),

        addProduct: builder.mutation<ApiResponse<Product>, Partial<Product>>({
            queryFn: async (body) => {
                try {
                    const data = await mockProductService.addProduct(body);
                    return { data };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation
} = productApi;
