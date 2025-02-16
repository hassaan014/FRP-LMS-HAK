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

function createData(name, calories, history) {
    return {
        name,
        calories,
        // fat,
        // carbs,
        // protein,
        // price,
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
                                Fee Structure
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Monthly Fee</strong></TableCell>
                                        <TableCell><strong>Annual Charges</strong></TableCell>
                                        <TableCell align='right'><strong>Total Fee Per Annum</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                            Rs. {historyRow.monthly}/-
                                            </TableCell>
                                            <TableCell>Rs. {historyRow.annual}/-</TableCell>
                                            <TableCell align="right">Rs. {(historyRow.monthly*12) + historyRow.annual}/-</TableCell>
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

const rows = [
    createData('11', 'Science General', [
        {
            monthly: 5000,
            annual: 10000,
        },
    ],),
    createData('11', 'Pre Engineering', [
        {
            monthly: 5000,
            annual: 10000,
        },
    ],),
    createData('12', 'Science General', [
        {
            monthly: 5000,
            annual: 10000,
        },
    ],),
    createData('12', 'Pre Engineering', [
        {
            monthly: 5000,
            annual: 10000,
        },
    ],),
];

export default function FeeStructure() {
    return (
        <DashboardProvider data={
            <TableContainer component={Paper}>
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
