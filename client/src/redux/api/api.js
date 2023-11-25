import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API,
    }),
    reducerPath: 'api',
    endpoints: (builder) => ({})
});

export default api;