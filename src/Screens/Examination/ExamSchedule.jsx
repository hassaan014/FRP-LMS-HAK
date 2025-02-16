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

function createData(name, calories, fat, carbs, protein, history) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
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
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Schedule
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Subject</strong></TableCell>
                        {/* <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      {/* <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
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
    carbs: PropTypes.string.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        // amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    // price: PropTypes.number.isRequired,
    protein: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('11', 'Science General', 6, '16/01/25', '09/02/25',[
    {
      date: '16/01/25',
      customerId: 'Urdu',
    },
    {
      date: '19/01/25',
      customerId: 'English',
    },
    {
      date: '23/01/25',
      customerId: 'Computer',
    },
    {
      date: '26/01/25',
      customerId: 'Islmaic Studies',
    },
    {
      date: '02/02/25',
      customerId: 'Mathematics',
    },
    {
      date: '09/02/25',
     customerId: 'Physics',
    },
  ],),
  createData('11', 'Pre Engineering', 6, '16/01/25', '09/02/25',[
    {
      date: '16/01/25',
      customerId: 'Urdu',
    },
    {
      date: '19/01/25',
      customerId: 'English',
    },
    {
      date: '23/01/25',
      customerId: 'Chemistry',
    },
    {
      date: '26/01/25',
      customerId: 'Islmaic Studies',
    },
    {
      date: '02/02/25',
      customerId: 'Mathematics',
    },
    {
      date: '09/02/25',
      customerId: 'Physics',
    },
  ],),
  createData('12', 'Science General', 6, '16/02/25', '09/03/25',[
    {
      date: '16/02/25',
      customerId: 'Urdu',
      amount: 3,
    },
    {
      date: '19/02/25',
      customerId: 'English',
      amount: 1,
    },
    {
      date: '23/02/25',
      customerId: 'Computer',
      amount: 1,
    },
    {
      date: '26/02/25',
      customerId: 'Pakistan Studies',
      amount: 1,
    },
    {
      date: '02/03/25',
      customerId: 'Mathematics',
      amount: 1,
    },
    {
      date: '09/03/25',
      customerId: 'Physics',
      amount: 1,
    },
  ],),
  createData('12', 'Pre Engineering', 6, '16/02/25', '09/03/25',[
    {
      date: '16/02/25',
      customerId: 'Urdu',
      amount: 3,
    },
    {
      date: '19/02/25',
      customerId: 'English',
      amount: 1,
    },
    {
      date: '23/02/25',
      customerId: 'Chemistry',
      amount: 1,
    },
    {
      date: '26/02/25',
      customerId: 'Pakistan Studies',
      amount: 1,
    },
    {
      date: '02/03/25',
      customerId: 'Mathematics',
      amount: 1,
    },
    {
      date: '09/03/25',
      customerId: 'Physics',
      amount: 1,
    },
  ],),
];

export default function ExamSchedule() {
  return (
    <DashboardProvider data={
        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><strong>Class</strong></TableCell>
            <TableCell align="right"><strong>Group</strong></TableCell>
            <TableCell align="right"><strong>Subjects</strong></TableCell>
            <TableCell align="right"><strong>Start Date</strong></TableCell>
            <TableCell align="right"><strong>End Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }/>
  );
}
