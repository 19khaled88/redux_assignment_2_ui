import React from 'react'
import { useLocation } from 'react-router-dom'

const Employer = () => {
    const {state} = useLocation()
    const {response} = state
  return (
    <div>
      <p>{response}</p>
    </div>
  )
}

export default Employer
