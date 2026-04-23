import dummySlice from './dummySlice';

export const customerApi = dummySlice.injectEndpoints({
    endpoints: (builder) => ({

        getUsers: builder.query<
            any,
            { limit?: number; skip?: number }
        >({
            query: ({ limit = 10, skip = 0 }) =>
                `/users?limit=${limit}&skip=${skip}`,

            transformResponse: (response: any) => {
                return {
                    users: response.users,
                    total: response.total,
                    skip: response.skip,
                    limit: response.limit,
                };
            },

            providesTags: (result) =>
                result ? [
                        ...result.users.map((u: any) => ({
                            type: 'Users' as const,
                            id: u.id,
                        })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),

        
    }),
});

export const {
    useGetUsersQuery,
} = customerApi;