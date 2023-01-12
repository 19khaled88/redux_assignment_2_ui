import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../css/nav.css'
const Navbar = () => {
  const reactState = useSelector((state) => state)
  const {auth} = reactState
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginSuccess,setLoginSuccess] = useState(false)
  /* side effect*/
  useEffect(() => {
    const token = localStorage.getItem('employeeAuthToken')
    const googleToken = localStorage.getItem('employeeGoogleToken')
    if (token !== null) {
      setIsAuthenticated(true)
    } 
    // else if (googleToken !== null) {
    //   setIsAuthenticated(true)
    // }
    if(auth.token){
      toast.success('login successful')
    }

  }, [auth])

  const logoutHandler = () => {
    localStorage.removeItem('employeeAuthToken')
    localStorage.removeItem('employeeGoogleToken')
    setIsAuthenticated(false)
    navigate('/login')
  }
  

  return (
    <div className="nav">
      <div className="logo">Employee Management System</div>
      <div className="navigation">
        <ul className="list">
          {isAuthenticated === true ? (
            <>
              <button onClick={()=>navigate('/dashboard')}>
              <img src="/images/dashboard.png" alt="No Image" width="25px" height="25px" />
              <p className='text'>Dashboard</p>
              </button>
              <button onClick={() => logoutHandler()}>
                <img
                  className="icon"
                  src="/images/logout.png"
                  alt="No Image"
                  width="25px"
                  height="25px"
                />
                <p className="text">Logout</p>
              </button>
            </>
          ) : (
            <Link to="/login">
              <span>
                <img
                  className="icon"
                  src="/images/login.png"
                  alt="No Image"
                  width="25px"
                  height="25px"
                />
              </span>
              <p className="text">Login</p>
            </Link>
          )}
          <Link to="/register">
            <span>
              <img
                className="icon"
                src="/images/register.png"
                alt="No Image"
                width="25px"
                height="25px"
              />
            </span>
            <p className="text">Register</p>
          </Link>
        </ul>
      </div>
      <Toaster />
    </div>
  )
}

export default Navbar
