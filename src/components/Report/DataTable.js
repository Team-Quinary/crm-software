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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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
        id: 'type',
        label: 'Type',
    },
    {
        id: 'username',
        label: 'Username',
    },
    {
        id: 'firstName',
        label: 'First Name',
    },
    {
        id: 'lastName',
        label: 'LastName',
    },
    {
        id: 'contactNo',
        label: 'Contact No',
    },
    {
        id: 'email',
        label: 'Email',
    }
];

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



export default function DataTable({ category }) {
    // const rows = useSelector(state => state.entities.payments.list);

    const rows =[
        {
            id: 1,
            type: 'Admin',
            username: 'Hasindu',
            firstName: 'Dilanka',
            lastName: 'Mahanama',
            contactNo: '0716996901',
            email: 'mahanama7722@gmail.com'
        },
        {
            id: 2,
            type: 'Admin',
            username: 'Thushan',
            firstName: 'Thushan D.',
            lastName: 'Fernando',
            contactNo: '0716996901',
            email: 'thushandfdo@gmail.com'
        },
        {
            id: 3,
            type: 'Customer',
            username: 'Hasini',
            firstName: 'Hasini',
            lastName: 'Fernando',
            contactNo: '0716996901',
            email: 'thushandfdo@gmail.com'
        },
        {
            id: 4,
            type: 'Tech Lead',
            username: 'Thushan',
            firstName: 'Thushan D.',
            lastName: 'Fernando',
            contactNo: '0716996901',
            email: 'thushandfdo@gmail.com'
        },
        {
            id: 5,
            type: 'Customer',
            username: 'Hasindu',
            firstName: 'Thushan D.',
            lastName: 'Fernando',
            contactNo: '0716996901',
            email: 'thushandfdo@gmail.com'
        },
    ];

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, border: '1px solid black' }}>
{/* import React from 'react';

const DataTable = React.forwardRef((props, ref) => {
  return (
    <table ref={ref}>
      // table content goes here
    </table>
  );
});

export default DataTable; */}


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
                                    .filter(row => 
                                        (category === 'All' || category === null) ? true : row.type.toLowerCase() === category.toLowerCase()
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.type}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.username}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.firstName}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.lastName}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid black' }} size='small'>{row.contactNo}</TableCell>
                                                <TableCell align="center" sx={{}} size='small'>{row.email}</TableCell>
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
                    rowsPerPageOptions={[10, 25, 50]}
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