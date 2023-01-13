import React from 'react'
import { useLocation } from 'react-router-dom'

const Employer = () => {
    const {state} = useLocation()
    const {data} = state
  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

export default Employer
