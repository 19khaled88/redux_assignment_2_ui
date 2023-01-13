import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                method:'POST',
                url:'/user',
                body:data 
            }),
        }),
        getUser:builder.query({
            query:(email)=>({
                url:`/user/?email=${email}`
            }),
            
        })
    }),
})

export const {useRegisterMutation,useGetUserQuery} = authApi