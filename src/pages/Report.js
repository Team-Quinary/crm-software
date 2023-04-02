import React, { useState } from 'react'
import DataTable from '../components/Report/DataTable'
import PrintButton from '../components/Report/PrintButton'
import { useStyles } from '../Styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Autocomplete, TextField } from "@mui/material";


export default function Report() {
    const { classes } = useStyles();
    const [category, setCategory] = useState('All');

    const searchList = ['All', 'Admin', 'Tech Lead', 'Customer'];

    return (
        <div className='report'>
            <div style={{ backgroundColor: '#fff', padding: '10px' }}>
                <div className={classes.paymentSearchBar}>
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        className={classes.searchStack}
                    >
                        <Typography>User Type : </Typography>
                        <Autocomplete
                            options={searchList}
                            value={category}
                            onChange={(event, newValue) => {
                                setCategory(newValue);
                            }}
                            disablePortal
                            renderInput={({ inputProps, ...rest }) =>
                                <TextField {...rest}
                                    name='type'
                                    variant='outlined'
                                    color='secondary'
                                    inputProps={{ ...inputProps, readOnly: true }}
                                    size='small'
                                    sx={{ width: '200px' }}
                                />
                            }
                        />
                        <PrintButton />
                    </Stack>
                </div>
                <DataTable category={category} />
            </div>
        </div>
    )
}
