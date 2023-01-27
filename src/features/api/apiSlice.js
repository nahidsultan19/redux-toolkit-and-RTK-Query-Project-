import { createApi, fetchBaseQuery } from '@redduxjs/toolkit/query/react';


const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        })
    })
});

export default productApi;