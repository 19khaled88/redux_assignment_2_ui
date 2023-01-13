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
  const [addEmailRole,{isErr,isLoad,isSucc}] = useRegisterMutation()
  
  const {data,isLoading,isError,error}= useGetUserQuery(email,{refetchOnMountOrArgChange:true})
  
  const loginTypeHandler=(data)=>{
    const body={email:email,role:data}
    addEmailRole(body)
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setLoading(false)
        dispatch(setuser(user.email))
      }else{
        setTimeout(()=>{
          setLoading(false)
          navigate('/login')
        },1000)
        // navigate('/login')
      }
    })

  },[navigate])

  if(data?.user?.role && data?.user?.role === 'employee'){
    navigate('/employee',{state:{data:'Emplyee login'}})
  }else if(data?.user?.role && data?.user?.role === 'employer'){
    navigate('/employer',{state:{data:'Emplyer login'}})
  }

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
