import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import '../css/login.css'
import { newUser } from '../redux/feature/auth/authSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: '',
    password: '',
    confirm: '',
  })


  const formSubmitHandler = (event) => {
    event.preventDefault()
    const data={
      email:state.email,password:state.password
    }
    if(!state.email){
     return toast.error("Email must be filed up")
    }
    if(!state.password){
     return toast.error('Password must be filed up')
    }
    if(state.password !== state.confirm){
     return toast.error('Password not match')
    }
    dispatch(newUser(data))
    
  }
  const inputChange = (event) => {
    const value = event.target.value
    setState({
      ...state,
      [event.target.name]: value,
    })
  }

  return (
    <div className="signContainer">
      <form className="login-form" onSubmit={formSubmitHandler}>
        <div>
          <span>
            <img
              src="/images/mail.png"
              alt="No Image"
              width="20px"
              height="20px"
            />
          </span>
          <input
            onChange={inputChange}
            placeholder="Email"
            type="email"
            value={state.email}
            name="email"
          />
        </div>
        <div>
          <span>
            <img
              src="/images/padlock.png"
              alt="No Image"
              width="20px"
              height="20px"
            />
          </span>
          <input
            autoComplete="off"
            onChange={inputChange}
            placeholder="Password"
            type="password"
            value={state.password}
            name="password"
          />
        </div>
        <div>
          <span>
            <img
              src="/images/confirmpassword.png"
              alt="No Image"
              width="20px"
              height="20px"
            />
          </span>
          <input
            autoComplete="off"
            onChange={inputChange}
            placeholder="Password"
            type="password"
            value={state.confirm}
            name="confirm"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
