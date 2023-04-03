import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Typography } from '@mui/material';


// function can be used as a comparator function for sorting an array of objects in descending order based on a specific property
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

//generate a comparator function for sorting an array of objects in either ascending or descending
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

//ensuring that elements that have the same value according to the comparator function are sorted in the same order as they appeared in the original array.
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'project',
        label: 'Project',
    },
    {
        id: 'customer',
        label: 'Customer',
    },
    {
        id: 'answer',
        label: 'Answer',
    }
];


//create a table head component that can be used for sorting table rows
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ borderRight: `${index !== headCells.length - 1 ? '1px solid black' : 'none'}`, borderBottom: '1px solid black' }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ width: '100%' }}
                        >
                            <Typography align='center' sx={{ flexGrow: 1 }}>
                                <b>{headCell.label}</b>
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
    // const rows = useSelector(state => state.entities.payments.list);

    const rows = [
        {
            project: "Project X",
            customer: "Hasathcharu",
            answer: "Testing answer"
        },
        {
            project: "Project Y",
            customer: "Menura",
            answer: "Testing answer1"
        },
        {
            project: "Project A",
            customer: "Waruni",
            answer: "Testing answer2"
        },
        {
            project: "Project B",
            customer: "Nethmini",
            answer: "Testing answer3"
        },
        {
            project: "Project C",
            customer: "Ransilu",
            answer: "Testing answer4"
        },
        {
            project: "Project D",
            customer: "Hasidu",
            answer: "Testing answer5"
        },
        {
            project: "Project E",
            customer: "Yahani",
            answer: "Testing answer6"
        },
        {
            project: "Project F",
            customer: "Hasathcharu",
            answer: "Testing answer7"
        },
        {
            project: "Project G",
            customer: "Rumesha",
            answer: "Testing answer8"
        },
        {
            project: "Project H",
            customer: "Nipuni",
            answer: "Testing answer9"
        },
        {
            project: "Project K",
            customer: "Taneesha",
            answer: "Testing answer10"
        },
        {
            project: "Project L",
            customer: "Tharaka",
            answer: "Testing answer11"
        },
    ];

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // const category = useSelector(state => state.entities.payments.variables.category);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, border: '1px solid black' }}>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows.length > 0
                                ?
                                stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.project}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.customer}</TableCell>
                                                <TableCell align="center" sx={{}} size='small'>{row.answer}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                :
                                <TableRow tabIndex={-1}>
                                    <TableCell align="center" colSpan={4} sx={{ color: 'gray', fontSize: '18px' }}>Table is empty...!</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10,20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ borderTop: '1px solid black' }}
                />
            </Paper>
        </Box>
    );
}
