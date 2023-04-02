import React from 'react'
import './Chart.css';
import { LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,

) {
    return { name, calories };
}

const rows = [
    createData('Formal Feedback Form', 1),
    createData('Descriptive Feedback Form', 2),
    createData('Evaluative Feedback Form', 3),
    createData('Progress Regulation Feedback Form', 4),
    createData('Guidance Feedback Form', 5),
    createData('Encouragement Feedback Form', 6),
    createData('Forward Feedback Form', 7),


];

export default function Chart({title,grid}) {
    const testData = [
        {
            id: 1,
            rate: 5,
            rates: 10
        },
        {
            id: 2,
            rate: 4,
            rates: 20
        },
        {
            id: 3,
            rate: 3,
            rates: 25
        },
        {
            id: 4,
            rate: 2,
            rates: 8
        },
        {
            id: 5,
            rate: 1,
            rates: 2
        },
        {
            id: 6,
            rate: 4,
            rates: 15
        },
        {
            id: 7,
            rate: 4,
            rates: 11
        },
        {
            id: 8,
            rate: 4,
            rates: 27
        },
    ];



    return (
        <div className='analysis'>
            <div className='analysiscol'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Feedback From Type</StyledTableCell>
                                <StyledTableCell align="right">ID</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className='analysiscol2'>
                <h3 className='charttitle'>{title}</h3>
                <ResponsiveContainer width="50%" aspect={1 / 1}>
                    <BarChart data={testData}>
                        <XAxis dataKey="rate" stroke="black" />
                        <YAxis />
                        <Line type="monotone" dataKey="rates" stroke="green" />
                        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rates" fill="#000" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className='analysiscol2'>
                <h3 className='charttitle'>{title}</h3>
                <ResponsiveContainer width="50%" aspect={1 / 1}>
                    <BarChart data={testData}>
                        <XAxis dataKey="rate" stroke="black" />
                        <YAxis />
                        <Line type="monotone" dataKey="rates" stroke="green" />
                        {grid && <CartesianGrid stroke="#25e6a2" strokeDasharray="5 5" />}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rates" fill="#000" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
            <div className='questiontable'>

            </div>
        </div>

    )
}
