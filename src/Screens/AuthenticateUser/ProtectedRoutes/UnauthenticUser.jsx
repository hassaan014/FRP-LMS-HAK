import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UnauthenticUser = () => {
  return (
    !(localStorage.getItem('UID')) ? <Outlet/> : <Navigate to="/dashboard"/>
  )
}

export default UnauthenticUser