import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8008/',
    }),
    tagTypes:['posts'],
    endpoints:(builder)=>({}),
})

export default apiSlice