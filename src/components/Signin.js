import React, { useEffect, useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
import { login } from '../redux/feature/auth/authSlice';

const Signin = () => {
    const [dataState,setDataState] = useState({email:'', password:'' })
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reactState = useSelector((state)=>state)


    /* side effect*/
    useEffect(()=>{
      const token = localStorage.getItem('employeeAuthToken')
      if(token !== null){
        setIsAuthenticated(true)
        navigate('/register')
      }
    },[reactState,navigate])
   
    const formSubmitHandler=(event)=>{
      event.preventDefault()
      const data={
        email:dataState.email,password:dataState.password
      }
      if(!dataState.email){
        return toast.error("Email must be filed up")
       }
       if(!dataState.password){
        return toast.error('Password must be filed up')
       }
       dispatch(login(data))
    }

    const inputChange=(event)=>{
        const value = event.target.value;
        setDataState({
            ...dataState,
            [event.target.name]:value
        })
    }

   
    return (
        <div className='signContainer'>
          <form className="login-form" onSubmit={formSubmitHandler}>
            <div>
              <span><img src="/images/mail.png" alt="No Image" width="20px" height="20px"/></span>
              <input
                onChange={inputChange}
                placeholder="Email"
                type="email"
                value={dataState.email}
                name="email"
              />
            </div>
            <div>
              <span><img src="/images/padlock.png" alt="No Image" width="20px" height="20px"/></span>
              <input
                autoComplete="off"
                onChange={inputChange}
                placeholder="Password"
                type="password"
                value={dataState.password}
                name="password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
}

export default Signin;