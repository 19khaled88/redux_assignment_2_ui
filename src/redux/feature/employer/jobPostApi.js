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
            })
        })
    })
})

export const {useCreateJobMutation,useJobFindQuery} = candidateApi