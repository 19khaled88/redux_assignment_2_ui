import React, { Children, useEffect, useState } from 'react'

import { NavLink,Link, useNavigate } from 'react-router-dom'
import '../css/side.css'
import { menuItem } from './SidebarData'
const Sidebar = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('employeeAuthToken')
    const googleToken = localStorage.getItem('employeeGoogleToken')
    if (token === null) {
      setIsAuthenticated(true)
      navigate('/login')
    } 
    // else if (googleToken === null) {
    //   setIsAuthenticated(true)
    //   navigate('/login')
    // }
  },[navigate])
  return (
    <div className='container'>
        <div>
          {
            menuItem.map((item,index)=>(
              <NavLink to={item.path} key={index} className="link">
                <div className='icon'>{item.icon}</div>
                <div className='link_text'>{item.name}</div>
              </NavLink>
            ))
          }
        </div>
        <div>{children}</div>
    </div>
  )
}

export default Sidebar
