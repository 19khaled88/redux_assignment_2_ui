import React from 'react'
import { useLocation } from 'react-router-dom'

const EmployeeDetails = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    <div>
      <p>Candidate's Profile</p>
      <h2>Profile Status: Your Profile is 100% finished, Congratulation</h2>
      <h3>Now Keep applying for your desired positions!</h3>

      <h2>You have not applied for any post yet!</h2>
    </div>
  )
}

export default EmployeeDetails
