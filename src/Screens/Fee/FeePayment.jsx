// import React from 'react'
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import * as React from 'react'
import { Box, LinearProgress, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../FirebaseConfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
// import { useLocation } from 'react-router-dom'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const FeePayment = () => {
    const locationData = useLocation()
    console.log(locationData)
  const [studentName, setStudentName] = useState(locationData.state.name)
  const [studentEmail, setStudentEmail] = useState(locationData.state.email)
  const [studentAge, setStudentAge] = useState(locationData.state.age)
  const [studentClass, setStudentClass] = useState(locationData.state.class)
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const addStudent = async () => {
    // if (studentName && studentName !== " " && studentEmail && studentEmail !== " " && studentAge && studentAge !== " " && studentClass && studentClass !== " ") {
        setLoader(true)
        let obj = {
          name: locationData.state.name,
          email: locationData.state.email,
          class: locationData.state.class,
          age: locationData.state.age,
          fee: "Paid",
        }
      try {

        let saveData = await updateDoc(doc(db, "Students",locationData.state.id), obj)
        setError(false)
        // console.log(saveData);
        // setStudentName('')
        // setStudentEmail('')
        // setStudentAge('')
        // setStudentClass('')
        navigate('/students/students_list')

      } catch (error) {
        setLoader(false)
        setError(true)
      }
    // } else {
    //   setError(true)
    // }
  }
  return (
    <DashboardProvider data={
      <>
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            {loader ? <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box> : null}
            {error ?
              <Typography
                component="h4"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 5vw, 1rem)', color: 'red' }}
              >
                Error Paying Fee!
              </Typography>
              : null
            }
            {/* <SitemarkIcon /> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom:2 }}
            >
              Pay Fee
            </Typography>
            <Box onSubmit={(e) => { e.preventDefault() }}
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                {/* <FormLabel htmlFor="name">Full name</FormLabel> */}
                <TextField
                  autoComplete="name"
                  //   name="name"
                  required
                  disabled
                  type='text'
                  fullWidth
                  id="name"
                  label="Full Name"
                //   onChange={(e) => {
                //     setStudentName(e.target.value)
                //   }}
                  value={studentName}

                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                <TextField
                  required
                  disabled
                  fullWidth
                  type='email'
                  id="email"
                  variant="outlined"
                  label="Email Address"
                  value={studentEmail}
                //   onChange={(e) => {
                //     setStudentEmail(e.target.value)
                //   }}
                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                <TextField
                  required
                  fullWidth
                  disabled
                  name=""
                  type="number"
                  id="age"
                  variant="outlined"
                  label="Age"
                  value={studentAge}
                //   onChange={(e) => {
                //     setStudentAge(e.target.value)
                //   }}
                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                <TextField
                  required
                  disabled
                  fullWidth
                  name=""
                  id="class"
                  variant="outlined"
                  type='number'
                  label="Class"
                  value={studentClass}
                //   onChange={(e) => {
                //     setStudentClass(e.target.value)
                //   }}
                />
              </FormControl>
              <Button
                fullWidth
                type='submit'
                variant="contained"
                onClick={addStudent}
              >
                Pay Fee
              </Button>
            </Box>

          </Card>
        </SignUpContainer>
      </>
    } />

  )
}

export default FeePayment