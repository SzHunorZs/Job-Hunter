import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:3030/";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'authentication',
                method: 'POST',
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
