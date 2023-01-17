import React, { useEffect, useState } from 'react'
import { useGetAllJobsQuery } from '../redux/feature/auth/candidateApi'
import ClipLoader from 'react-spinners/CircleLoader'
import PacmanLoader from 'react-spinners/PacmanLoader'
import JobPosts from './JobPosts'

const Welcome = () => {
  const [posts, setPost] = useState('')
  const {data, isLoading,isError} = useGetAllJobsQuery()
 
  useEffect(()=>{
    if(isLoading){
      <PacmanLoader color="#36d7b7"/>
      }
      if(!isLoading && isError){
        console.log('Error....')
      }
      if(!isLoading && !isError && data?.response){
        setPost(data?.response)
      }
   
  },[isLoading,isError])

  console.log(posts)
  return (
    <div style={{display:'flex',flexDirection:'column',textAlign:'center',alignItems:'center',height:'88vh',width:'70vw',margin:'auto'}}>
      <h1>Welcome to Employee Management application</h1>
        <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'10px',paddingTop:'20px'}}>
            {
              !posts ? <PacmanLoader color="#36d7b7"/> : posts.map((item,index)=>(
                <div key={index} style={{display:'flex',flexDirection:'column',width:'100%',border:'1px solid gray',borderRadius:'5px',padding:'5px 8px 5px 8px'}}>
                    <div style={{display:'flex',flexDirection:'column',textAlign:'left'}}>
                      <span style={{fontSize:'18px',fontWeight:'500'}}>{item.companyName}</span>
                      <span>Responsibility : {item.responsibility}</span>
                      <span>Location : {item.location}</span>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                      <div style={{display:'flex',flexDirection:'row',gap:'15px'}}>
                        <span>{item.position}</span>
                        <span>{item.requirement}</span>
                        <span style={{color:'gray'}}>{item.type}</span>
                      </div>
                      <button>Apply</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Welcome
