import React from 'react'
import { NavLink } from 'react-router-dom'
import { menuItem } from '../SidebarData'

const Analytics = () => {
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
    <div><p>Analytics</p></div>
  </div>
  )
}

export default Analytics
