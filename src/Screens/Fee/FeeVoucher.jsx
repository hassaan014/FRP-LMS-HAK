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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../FirebaseConfig';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

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

const FeeVoucher = () => {
    const [studentId, setStudentId] = useState('')
    const [studentData, setStudentData] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    // const [obj,setObj] = useState({})

    const navigate = useNavigate()
    
    const [tests,setTests] = useState(false)
    // let [obj,setObj] = useState();
    const addStudent = async () => {
        // if (studentId && (studentId !== " ")) {
            try {
                let arr = []
                setStudentData(arr)
                setLoader(true)
                let getData = await getDocs(collection(db, "Students"));
                setError(false)
                getData.forEach((docs) => {arr.push({...docs.data(), id: docs.id})})
                setStudentId('')
                setStudentData(arr)
                let obj = studentData.filter((e,i)=>{return (e.id == studentId)})
                console.log(obj);
                 obj.length > 0 ? navigate('/fee/fee_payment', { state: obj[0] }) : setError(true)
                setLoader(false)
            } catch (error) {
                setError(true)
                setLoader(false)
            }
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
                                Error Generating Voucher!
                            </Typography>
                            : null
                        }
                        {/* <SitemarkIcon /> */}
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: 2 }}
                        >
                            Student Fee Voucher
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
                                    id="id"
                                    label="Student ID"
                                    value={studentId}
                                    onChange={(e) => {
                                        setStudentId(e.target.value)
                                    }}

                                />
                            </FormControl>
                            <Button
                                fullWidth
                                type='submit'
                                variant="contained"
                                onClick={addStudent}
                            >
                                Generate Voucher
                            </Button>
                        </Box>

                    </Card>
                </SignUpContainer>
            </>
        } />

    )
}

export default FeeVoucher