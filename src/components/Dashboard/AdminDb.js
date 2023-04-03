import React from 'react';
import { Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

export default function AdminDb({ useStyles }) {
    const { classes } = useStyles();

    const {
        projectCount,
        customerCount,
        techLeadCount,
        completed,
        ongoing,
        suspended,
        lastDays,
        newProjects,
        payments
    } = useSelector(state => state.login.dashboardData);

    const newProjectsData = newProjects.map((item, index) => {
        return {
            day: lastDays[index],
            projects: item
        }
    });

    const paymentsData = payments.map((item, index) => {
        return {
            day: lastDays[index],
            payments: item
        }
    });

    return (
        <div className='adminDashboard'>
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
                                <div className={classes.card}>
                                    <Typography># of Tech Leads</Typography>
                                    <div className={classes.cardNumber}>{techLeadCount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.chartContainer}>
                        <div className={classes.chart}>
                            <Typography align='center' sx={{ mb: 1 }} variant='h6'>
                                Projects Started
                            </Typography>
                            <ResponsiveContainer aspect={3 / 2}>
                                <AreaChart
                                    data={newProjectsData}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="projects" stroke="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={classes.chart}>
                            <Typography align='center' sx={{ mb: 1 }} variant='h6'>
                                Payments Received (USD)
                            </Typography>
                            <ResponsiveContainer aspect={3 / 2}>
                                <AreaChart
                                    data={paymentsData}
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="payments" stroke="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className={classes.requirements}>

                </div>
            </div>
        </div >
    )
}
