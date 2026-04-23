import dummySlice from './dummySlice';

// Dummyjson product type
export type DummyProduct = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
    brand?: string;
    availabilityStatus: string;
};

type DummyProductsResponse = {
    products: DummyProduct[];
    total: number;
    skip: number;
    limit: number;
};

export const productApi = dummySlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query<
            DummyProductsResponse,
            { limit?: number; skip?: number; search?: string }
        >({
            query: ({ limit = 10, skip = 0, search }) => {
                if (search) {
                    return `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
                }
                return `/products?limit=${limit}&skip=${skip}`;
            },
            transformResponse: (response: any) => ({
                products: response.products,
                total: response.total,
                skip: response.skip,
                limit: response.limit,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.products.map((p) => ({ type: 'Products' as const, id: p.id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        getProductById: builder.query<DummyProduct, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _err, id) => [{ type: 'Products', id }],
        }),

        getProductsByCategory: builder.query<DummyProductsResponse, string>({
            query: (category) => `/products/category/${category}`,
            providesTags: ['Products'],
        }),

        // product add
        addDummyProduct: builder.mutation<DummyProduct, Partial<DummyProduct>>({
            query: (body) => ({
                url: '/products/add',
                method: 'POST',
                body,
            }),
            async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
                // optimistic update kiya h 
                const patchResult = dispatch(
                    productApi.util.updateQueryData(
                        'getProducts',
                        { limit: 12, skip: 0 },
                        (draft) => {
                            const optimisticProduct: DummyProduct = {
                                id: Date.now(), // temp id
                                title: newProduct.title ?? 'New Product',
                                description: newProduct.description ?? '',
                                category: newProduct.category ?? '',
                                price: newProduct.price ?? 0,
                                discountPercentage: 0,
                                rating: 0,
                                stock: newProduct.stock ?? 0,
                                thumbnail: newProduct.thumbnail ?? '',
                                availabilityStatus: 'In Stock',
                            };
                            draft.products.unshift(optimisticProduct);
                            draft.total += 1;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo(); 
                }
            },
        }),

        
        deleteDummyProduct: builder.mutation<{ isDeleted: boolean; id: number }, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // Optimistic delete vala
                const patchResult = dispatch(
                    productApi.util.updateQueryData(
                        'getProducts',
                        { limit: 12, skip: 0 },
                        (draft) => {
                            draft.products = draft.products.filter((p) => p.id !== id);
                            draft.total -= 1;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo(); 
                }
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useAddDummyProductMutation,
    useDeleteDummyProductMutation,
} = productApi;