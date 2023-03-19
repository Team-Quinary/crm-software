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
import { useStyles } from '../Styles';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
        id: 'amount',
        label: 'Amount',
    },
    {
        id: 'date',
        label: 'Date',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
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
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
        {
            paymentId: 1,
            projectId: 8,
            project: {
                projectId: 8,
                name: 'ABCD',
                fee: 350000,
                duration: 3,
                startDate: '2023-04-08T18:30:00',
                installments: 3,
                status: 'Ongoing',
                description: 'ABCDEFG',
                customerId: 9,
                techLeadId: 7
            },
            amount: 1000,
            date: '2023-04-19T06:11:01.121',
            stripeId: 'string'
        },
    ];

    const { classes } = useStyles();

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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("sv-SE");
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody className={classes.paymentTable}>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell align="center" sx={{ borderRight: '1px solid black' }}>{row.project.name}</TableCell>
                                            <TableCell align="center" sx={{ borderRight: '1px solid black' }}>{row.project.customerId}</TableCell>
                                            <TableCell align="center" sx={{ borderRight: '1px solid black' }}>{row.amount}</TableCell>
                                            <TableCell align="center" sx={{}}>{formatDate(row.date)}</TableCell>
                                        </TableRow>
                                    );
                                })}
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
                />
            </Paper>
        </Box>
    );
}
