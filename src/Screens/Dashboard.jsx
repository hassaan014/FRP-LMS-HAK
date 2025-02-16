import React from 'react'
import DashboardProvider from '../Components/DashboardProvider/DashboardProvider'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
    <DashboardProvider data={
      <Box sx={{display:'flex',width:'100%',justifyContent:'end', padding:2}}>
      <Button sx={{cursor:'pointer'}} variant='contained' onClick={()=>{
        localStorage.clear()
        navigate('/')
      }} >Logout</Button>
      </Box>
    } />
    </>
  )
}

export default Dashboard