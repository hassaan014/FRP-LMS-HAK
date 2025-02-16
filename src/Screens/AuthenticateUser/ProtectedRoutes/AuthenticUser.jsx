import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticUser = () => {
  return (
    localStorage.getItem('UID') ? <Outlet/> : <Navigate to="/signup"/>
  )
}

export default AuthenticUser