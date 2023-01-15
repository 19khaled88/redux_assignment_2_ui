import apiSlice from "../api/apiSlice";

const candidateApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        resume:builder.mutation({
            query:(data)=>({
                method:'POST',
                url:'/resume',
                body:data
            })
        }),
        resumeFind:builder.query({
            query:(email)=>({
                url:`/getResume/?email=${email}`
            })
        })
    })
})

export const {useResumeMutation,useResumeFindQuery} = candidateApi