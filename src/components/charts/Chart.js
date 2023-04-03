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
import AnswerTable from './AnswerTable';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//material uis

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//ui materials

//style-component library define the two custom component table call, cell and row
//this is styleTableCell method
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

//style table row method
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


//fuction called createData has two arguments as 
//returns an object as those properties
function createData(formtype, id) {
    return { formtype, id };
}

//dummy data for creating styled-table component
const rows = [
    createData('Formal Feedback Form', 1),
    createData('Descriptive Feedback Form', 2),
    createData('Evaluative Feedback Form', 3),
    createData('Progress Regulation Feedback Form', 4),
    createData('Guidance Feedback Form', 5),
    createData('Encouragement Feedback Form', 6),
    createData('Forward Feedback Form', 7),
];


const Question = [
    { Tittle: 'Question 1' },
    { Tittle: 'Question 2' },
    { Tittle: 'Question 3' },
    { Tittle: 'Question 4' },
    { Tittle: 'Question 5' },
    { Tittle: "Question 6" },
    { Tittle: 'Question 7' },
    { Tittle: 'Question 8' },
    { Tittle: 'Question 9' },
];


//fuction for store data to create charts, has two props as title and grid
export default function Chart({ title, grid }) {

    //tetData is an array object , each data arry object represents a data point for a chart
    // has 3 props as
    const testData = [
        {
            id: 1,
            rate: 5,
            progress: 10
        },
        {
            id: 2,
            rate: 4,
            progress: 20
        },
        {
            id: 3,
            rate: 3,
            progress: 25
        },
        {
            id: 4,
            rate: 2,
            progress: 8
        },
        {
            id: 5,
            rate: 3,
            progress: 2
        },
        {
            id: 6,
            rate: 4,
            progress: 15
        },
        {
            id: 7,
            rate: 4,
            progress: 11
        },
        {
            id: 8,
            rate: 4,
            progress: 27
        },
    ];

    //table component that renders Feedback form type and ids
    return (
        <div>
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
                                    <StyledTableRow key={row.formtype}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.formtype}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.id}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className='analys-elements'>
                    <div className='analysiscol2'>
                        <h3 className='charttitle'>{title}</h3>
                        <ResponsiveContainer width="100%" aspect={2 / 1}>
                            <BarChart data={testData}>
                                <XAxis dataKey="id" stroke="black" />
                                <YAxis />
                                <Line type="monotone" dataKey="rate" stroke="green" />
                                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="rate" fill="#000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='analysiscol2'>
                        <h3 className='charttitle'>{title}</h3>
                        <ResponsiveContainer width="100%" aspect={2 / 1}>
                            <BarChart data={testData}>
                                <XAxis dataKey="id" stroke="black" />
                                <YAxis />
                                <Line type="monotone" dataKey="progress" stroke="green" />
                                {grid && <CartesianGrid stroke="#25e6a2" strokeDasharray="5 5" />}
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="progress" fill="blue" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='questiontable'>
                        <div className='question-checkbox'>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={Question}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.Tittle}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox className='checkbox_select'
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.Tittle}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="select a question" placeholder="Favorites" />
                                )}
                            />
                        </div>
                        <AnswerTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
//recharts that used to generate bar charts for indicate rates and the progress given by customers through feedback forms