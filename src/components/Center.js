import { Grid } from '@mui/material';
import React from 'react'

function Center(props) {
    return (
        <div className='center'>
            <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={1}>
                    {props.children}
                </Grid>
            </Grid>
        </div>
    )
}

export default Center;