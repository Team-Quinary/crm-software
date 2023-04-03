import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function TechLeadDB({ useStyles }) {
    const { classes } = useStyles();

    const {
        projectCount,
        customerCount,
        completed,
        ongoing,
        suspended,
    } = useSelector(state => state.login.dashboardData);

    return (
        <div className='techleadDashboard'>
            <div className={classes.container}>
                <div>
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
                        <div> {/* to prevent auto resizing */}
                            <div className={classes.secondaryCards}>
                                <div className={classes.card}>
                                    <Typography># of Customers</Typography>
                                    <div className={classes.cardNumber}>{customerCount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.requirements}>

                </div>
            </div>
        </div>
    )
}
