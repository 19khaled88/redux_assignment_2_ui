import React from 'react'
import { useLocation } from 'react-router-dom'

const Employee = () => {
    const {state} = useLocation()
    const {data} = state
  return (
    <div>
      <p>{data}</p>
      <p>Employee page</p>
    </div>
  )
}

export default Employee
