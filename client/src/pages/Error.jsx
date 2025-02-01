import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      404 Error Page not found.
      <NavLink to="/">Home</NavLink>
      <br/>
      <NavLink to ="/contact">Report a problem</NavLink>
    </div>
  )
}

export default Error
