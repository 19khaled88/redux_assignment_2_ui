import React, { Children } from 'react'

import { NavLink,Link } from 'react-router-dom'
import '../css/side.css'
import { menuItem } from './SidebarData'
const Sidebar = ({children}) => {
 
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
