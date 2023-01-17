import apiSlice from "../api/apiSlice";

const candidateApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createJob:builder.mutation({
            query:(data)=>({
                method:'POST',
                url:'/jobPost',
                body:data
            })
        }),
        jobFind:builder.query({
            query:(email)=>({
                url:`/findPostJobs/?email=${email}`
            }),
            providesTags:['posts']
        }),
        closeJob:builder.mutation({
            query:({id,...status})=>({
                method:'POST',
                url:`/editPost/?id=${id}`,
                body:status
            }),
            providesTags:['posts']
        })
    })
})

export const {useCreateJobMutation,useJobFindQuery,useCloseJobMutation} = candidateApi