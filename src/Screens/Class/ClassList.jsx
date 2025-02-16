// import React from 'react'
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { db } from '../../FirebaseConfig';
import { doc, setDoc,deleteDoc, getDocs, addDoc, collection } from 'firebase/firestore'
import { useEffect } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';

const ClassList = () => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [classesData, setClassesData] = useState([])
    const [refresh, setRefresh] = useState(false)

    const getData = async () => {
        let data = await getDocs(collection(db, "Classes"))

        let rows = [];

        !data.empty ?
            data.forEach((docs) => {
                // console.log(docs.id)
                // console.log(docs.data())
                let obj = { ...docs.data(), id: docs.id }
                rows.push(obj)
                setClassesData(rows)
            })
            : setClassesData([])
    }
    useEffect(() => {
        getData()
        setLoader(false)
    }, [refresh])

    let dele = async (id) => {
        console.log(id);
        setLoader(true)
        try {

            id && await deleteDoc(doc(db, "Classes", id))

            setRefresh(!refresh)
            setError(false)
        } catch (error) {
            setLoader(false)
            setError(true)
        }
    }


    return (
        <DashboardProvider data={
            <>
                <TableContainer component={Paper}>
                {loader ? <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box> : null}
            {error ?
              <Typography
                component="h4"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(1rem, 5vw, 1rem)', color: 'red' }}
              >
                Error Deleting Class!
              </Typography>
              : null
            }
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Class</strong></TableCell>
                                <TableCell align="right"><strong>Section</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{display:'flex',justifyContent:'center',width:'1'}}>
                            {classesData.length !== 0 ? classesData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.class}
                                    </TableCell>
                                    <TableCell align="right">{row.sec}</TableCell>
                                    <TableCell align="right"><Button onClick={() => { dele(row.id) }} variant='outlined'>Delete</Button></TableCell>
                                </TableRow>
                            )) : <Typography sx={{width:'100%'}}>No Data</Typography>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>} />
    )
}

export default ClassList