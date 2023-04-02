import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles()((theme) => {
    const cardstyles = {
        backgroundColor: '#E0E0E0',
        borderRadius: '10px',
        padding: '20px',
        marginRight: '20px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
    };

    return {
        container: {
            display: 'grid',
            gridTemplateColumns: '3fr 1fr',
            columnGap: '20px',
        },
        requirements: {

        },
        cardContainer: {
            display: 'grid',
            gridTemplateColumns: '270px 1fr',
        },
        card: {
            ...cardstyles,
            width: '250px',
        },
        cardNumber: {
            fontSize: '50px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        summaryCount: {
            fontWeight: 'bold',
            color: '#000',
        },
        projectSummary: {
            backgroundColor: '#F5F5F5',
            padding: '10px 20px',
            '& .MuiTypography-root:not(:first-of-type)': {
                marginTop: '10px',
            },
            color: 'gray',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.3)',
        },
        secondaryCards: {
            display: 'flex'
        },
        chartContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: '20px',
        },
        chart: {
            ...cardstyles,
            paddingLeft: 0,
            paddingBottom: 10,
        }
    }
});

export default function AdminDb() {
    const { classes } = useStyles();

    const projectCount = 250;
    const customerCount = 150;
    const techLeadCount = 105;
    const completed = 100;
    const ongoing = 180;
    const suspended = 10;

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
    ];

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
                                <LineChart
                                    data={data}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={classes.chart}>
                            <Typography align='center' sx={{ mb: 1 }} variant='h6'>
                                Payments Received
                            </Typography>
                            <ResponsiveContainer aspect={3 / 2}>
                                <LineChart
                                    data={data}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                </LineChart>
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
