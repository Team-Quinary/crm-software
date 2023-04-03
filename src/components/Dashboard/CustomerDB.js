import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function CustomerDB({ useStyles }) {
    const { classes } = useStyles();

    const {
        projectCount,
        completed,
        ongoing,
        suspended,
    } = useSelector(state => state.login.dashboardData);

    return (
        <div className='customerDashboard'>
            <div className={classes.container}>
                <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <Typography># of Projects</Typography>
                        <div className={classes.cardNumber}>{projectCount}</div>
                        <div className={classes.projectSummary}>
                            <Typography>Completed: <span className={classes.summaryCount}>{completed}</span></Typography>
                            <Typography>Ongoing: <span className={classes.summaryCount}>{ongoing}</span></Typography>
                            <Typography>Suspended: <span className={classes.summaryCount}>{suspended}</span></Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
