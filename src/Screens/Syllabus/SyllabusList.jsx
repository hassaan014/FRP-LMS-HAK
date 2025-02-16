import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, LinearProgress } from '@mui/material';
import { db } from '../../FirebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FcRefresh } from 'react-icons/fc';


export default function SyllabusList() {

    function createData(name, calories, history) {
        return {
            name,
            calories,
            history,
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Syllabus List
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Syllabus</strong></TableCell>
                                            <TableCell><strong>Actions</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                <a sx={{textDecoration:'none'}} href={historyRow.sub} download><Button variant='outlined'>Download</Button></a>
                                                </TableCell>
                                                <TableCell><Button onClick={() => deleteSubject(historyRow.id, row.name, row.calories)} variant='outlined'>Delete</Button></TableCell>
                                                {/* <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{(historyRow.customerId / historyRow.date) * 100}%</TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.string.isRequired,
            // carbs: PropTypes.string.isRequired,
            // fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    // amount: PropTypes.number.isRequired,
                    customerId: PropTypes.number.isRequired,
                    date: PropTypes.number.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            // price: PropTypes.number.isRequired,
            // protein: PropTypes.string.isRequired,
        }).isRequired,
    };


    let rows = []

    const getSubjectsData = async () => {
        console.log(sg11, sg12, pe11, pe12);

        setLoader(true)

        let getSG11 = await getDocs(collection(db, 'Syllabus', '11', 'SG'));
        let arr1 = []

        !getSG11.empty ? (getSG11.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id }
            arr1.push(obj)
            setSG11(arr1)
        })) : setSG11([]);

        let getSG12 = await getDocs(collection(db, 'Syllabus', '12', 'SG'));
        let arr2 = []

        !getSG12.empty ? (getSG12.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id }
            arr2.push(obj)
            setSG12(arr2)
        })) : setSG12([]);

        let getPE11 = await getDocs(collection(db, 'Syllabus', '11', 'PE'));
        let arr3 = []

        !getPE11.empty ? (getPE11.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id }
            arr3.push(obj)
            setPE11(arr3)
        })) : setPE11([]);

        let getPE12 = await getDocs(collection(db, 'Syllabus', '12', 'PE'));
        let arr4 = []

        !getPE12.empty ? (getPE12.forEach((doc) => {
            let obj = { ...doc.data(), id: doc.id }
            arr4.push(obj)
            setPE12(arr4)
        })) : setPE12([]);
        
        setLoader(false)
    }

    const [sg11, setSG11] = useState([]);
    const [sg12, setSG12] = useState([]);
    const [pe11, setPE11] = useState([]);
    const [pe12, setPE12] = useState([]);
    const [loader,setLoader] = useState(false)
    const [error,setError] = useState(false)
    const [refresh, setRefresh] = useState([]);

    let deleteSubject = async (id, className, group) => {
        setLoader(true)
        console.log(id, className, group);
try {
    await deleteDoc(doc(db, "Syllabus", `${className}`, `${group == "Science General" ? "SG" : group == "Pre Engineering" ? "PE" : ''}`, id))
    // getSubjectsData()
    setRefresh(!refresh)
    setError(false)
} catch (error) {
    setError(true)
}
    }

    useEffect(() => {
        getSubjectsData();
    }, [refresh])

    rows = [
        createData('11', 'Science General', sg11),
        createData('11', 'Pre Engineering', pe11,),
        createData('12', 'Science General', sg12,),
        createData('12', 'Pre Engineering', pe12,),
    ];
    return (
        <DashboardProvider disabled={loader} data={
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
                Error Deleting Syllabus!
              </Typography>
              : null
            }
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><strong>Class</strong></TableCell>
                            <TableCell align="right"><strong>Group</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        } />
    );
}
