import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const jobsApi = createApi({
    reducerPath: 'jobs',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => "jobs",
            transformResponse: (response) => response.data
        }),
        apply: builder.mutation({
            query: (body) => ({
                url: 'applicants',
                method: 'POST',
                body,
            }),
        }),
        getExperiences: builder.query({
            query: () => 'experiences',
            transformResponse: (response) => response.data
        }),
        getApplicants: builder.query({
            query: (jobId) => `applicants?jobId=${jobId}`,
            transformResponse: (response) => response
        })
    }),
});

export const {useGetJobsQuery, useApplyMutation, useGetExperiencesQuery, useGetApplicantsQuery} = jobsApi;