// import React from 'react'
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import SignUp from '../../Components/Form/Form';
import * as React from 'react'
import { Box, LinearProgress, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../../Components/CustomIcon';
// import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';


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

const StudentUpdate = () => {
  const { state } = useLocation()
  // console.log(state.row);

  const [studentName, setStudentName] = useState(state.row.name)
  const [studentEmail, setStudentEmail] = useState(state.row.email)
  const [studentAge, setStudentAge] = useState(state.row.age)
  const [studentClass, setStudentClass] = useState(state.row.class)
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const updateStudent = async () => {
    if (studentName && studentName !== " " && studentEmail && studentEmail !== " " && studentAge && studentAge !== " " && studentClass && studentClass !== " ") {
      try {
        setLoader(true)
        let update = await updateDoc(doc(db, "Students", state.row.id), {
          name: studentName,
          email: studentEmail,
          age: studentAge,
          class: studentClass,
        })
        setError(false)
        setStudentName('')
        setStudentEmail('')
        setStudentAge('')
        setStudentClass('')
        // setLoader(false)
        navigate('/students/students_list')
        // console.log(update);
      } catch (error) {
        // console.log(error);
        setLoader(false)
        setError(true)
      }
    } else {
      setError(true)
    }
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
                Error Updating Student!
              </Typography>
              : null
            }
            {/* <SitemarkIcon /> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom:2 }}
            >
              Update Student
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
                  type='text'
                  fullWidth
                  id="name"
                  label="Full Name"
                  onChange={(e) => {
                    setStudentName(e.target.value)
                  }}
                  value={studentName}

                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                <TextField
                  required
                  fullWidth
                  type='email'
                  id="email"
                  //   placeholder="your@email.com"
                  //   name="email"
                  //   autoComplete="email"
                  variant="outlined"
                  label="Email Address"
                  value={studentEmail}
                  onChange={(e) => {
                    setStudentEmail(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                <TextField
                  required
                  fullWidth
                  name=""
                  type="number"
                  id="age"
                  variant="outlined"
                  label="Age"
                  value={studentAge}
                  onChange={(e) => {
                    setStudentAge(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                <TextField
                  required
                  fullWidth
                  name=""
                  id="class"
                  variant="outlined"
                  type='number'
                  label="Class"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value)
                  }}
                />
              </FormControl>
              <Button
                fullWidth
                type='submit'
                variant="contained"
                onClick={() => { updateStudent() }}
              >
                Update Student
              </Button>
            </Box>

          </Card>
        </SignUpContainer>
      </>
    } />

  )
}

export default StudentUpdate