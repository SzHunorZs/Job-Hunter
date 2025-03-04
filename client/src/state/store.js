import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './authSlice.js';
import {authApi} from './api/authApiSlice.js';
import {jobsApi} from './api/jobsApiSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(jobsApi.middleware)
});