import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../css/nav.css'
const Navbar = () => {
  const reactState = useSelector((state) => state)
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  /* side effect*/
  useEffect(() => {
    const token = localStorage.getItem('employeeAuthToken')
    if (token !== null) {
      setIsAuthenticated(true)
    }
  }, [reactState])

  const logoutHandler = () => {
    localStorage.removeItem('employeeAuthToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="nav">
      <div className="logo">Employee Management System</div>
      <div className="navigation">
        <ul className="list">
          {isAuthenticated === true ? (
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
