import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import * as React from 'react'
import { Box, LinearProgress, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { InputLabel, MenuItem, Select } from '@mui/material'

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


const SubjectAdd = () => {
    const [className, setClassName] = useState('')
    const [group, setGroup] = useState('')
    const [subject, setSubject] = useState('')

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const addSubject = async () => {
        if(subject && subject !== " " && className && group){
            try {
                    setLoader(true)
                    let obj = {
                    //   class: className,
                      sub: subject,
                    }
            
                    let saveData = await addDoc(collection(db,"Subjects",`${className}`,`${group}`), obj)
                    setError(false)
                    // console.log(saveData);
                    
                    setClassName('')
                    setSubject('')
                    setGroup('')
                    navigate('/subjects/subject_list')
            
                  } catch (error) {
                    setLoader(false)
                    setError(true)
                  }
        }else{
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
                                Error Adding Subject!
                            </Typography>
                            : null
                        }
                        {/* <SitemarkIcon /> */}
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: 2 }}
                        >
                            Add Subject
                        </Typography>
                        <Box onSubmit={(e) => { e.preventDefault() }}
                            component="form"
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label='Class'
                                    value={className}
                                    onChange={(e)=>setClassName(e.target.value)}
                                >
                                    <MenuItem value={11}>Eleven</MenuItem>
                                    <MenuItem value={12}>Twelve</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label='Group'
                                    value={group}
                                    onChange={(e)=>setGroup(e.target.value)}
                                >
                                    <MenuItem value={'SG'}>Science General</MenuItem>
                                    <MenuItem value={'PE'}>Pre Engineering</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                {/* <FormLabel htmlFor="password">Password</FormLabel> */}
                                <TextField
                                    required
                                    fullWidth
                                    name=""
                                    id="subject"
                                    variant="outlined"
                                    type='text'
                                    label="Subject"
                                    value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value)
                                }}
                                />
                            </FormControl>
                            <Button
                                fullWidth
                                type='submit'
                                variant="contained"
                                onClick={addSubject}
                            >
                                Add Subject
                            </Button>
                        </Box>

                    </Card>
                </SignUpContainer>
            </>
        } />
    )
}

export default SubjectAdd