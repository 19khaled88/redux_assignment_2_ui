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
        }),
      
       getAllJobs:builder.query({
            query:()=>({
                url:`/getAllJob`
            })
        })
    })
})

export const {useResumeMutation,useResumeFindQuery,useGetAllJobsQuery} = candidateApi