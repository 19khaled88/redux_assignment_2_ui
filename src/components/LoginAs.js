import { onAuthStateChanged } from 'firebase/auth'
import ClipLoader from 'react-spinners/CircleLoader'
import PacmanLoader from 'react-spinners/PacmanLoader'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import auth from '../config/firebase'
import '../css/loginas.css'
import { useGetUserQuery, useRegisterMutation } from '../redux/feature/auth/authApi'
import { setuser } from '../redux/feature/auth/authSlice'

const LoginAs = () => {
  
  const [loading, setLoading] = useState(true)
  const[role, setRole] = useState('')
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const {email} = useSelector((state)=>state.auth)
  const [addEmailRole,{data:regiData,isLoading:registrationLoading,isError:registrationError,isSuccess:registrationSuccess}] = useRegisterMutation()
  
  const {data,isLoading,isError,error}= useGetUserQuery(email,{refetchOnMountOrArgChange:true})
  
  const loginTypeHandler=(data)=>{
    const body={email:email,role:data}
    if(body.email){
      console.log('emali found')
    }else{
      console.log('email not found')
    }
    addEmailRole(body)
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setLoading(false)
        dispatch(setuser(user.email))
      }else{
        setTimeout(()=>{
          setLoading(true)
          navigate('/login')
        },1000)
        // navigate('/login')
      }
    })

  },[navigate])

  // useEffect(()=>{
  //   if(data?.user?.role && data?.user?.role === 'employee'){
  //     navigate('/employee',{state:{response:'Candidate Page',email:data?.user?.email}})
  //   }else if(data?.user?.role && data?.user?.role === 'employer'){
  //     console.log(data)
  //     navigate('/employer',{state:{response:'Employer login'}})
  //   }
  // },[data,email])

  useEffect(()=>{
    if(registrationLoading){
      console.log('loading....')
    }
    if(!registrationLoading && registrationError){
      console.log('error....')
    }
    if(!registrationLoading && !registrationError && regiData){
      if(regiData?.role && regiData?.role === 'employee'){
        navigate('/employee',{state:{response:'Candidate Page',email:data?.user?.email}})
      }else if(regiData?.role && regiData?.role === 'employer'){
        
        navigate('/employer',{state:{response:'Employer login'}})
      }
    }
  },[registrationError,registrationLoading,registrationSuccess])
  return (
    <div className='loginAsContainer'>
      {
        loading === true ? 
        <PacmanLoader color="#36d7b7" /> :
        isLoading ? 
        <PacmanLoader color="#36d7b7"/> :
       <>
          <h2>Get Started As:</h2>
          <div className='icon'>
              <div>
                <p className='text'>Employer</p>
                <img onClick={()=>loginTypeHandler('employer')} src="/images/employer.png" alt="No Image"/>
              </div>
              <div>
                <p className='text'>Employee</p>
                <img onClick={()=>loginTypeHandler('employee')} src="/images/employee.png" alt="No Image"/>
              </div>
          </div>
       </>
      }
      
    </div>
  )
}

export default LoginAs
