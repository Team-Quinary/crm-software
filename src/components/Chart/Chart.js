import React from 'react';
import { createUseStyles } from 'react-jss';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// material-ui imports
import Typography from '@mui/material/Typography';

// styles
const useStyles = createUseStyles((theme) => ({
    chart: {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        borderRadius: "10px",
        padding: "20px",
        marginRight: "20px",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
        paddingLeft: "0",
        paddingBottom: "10px"
    },
    axis: {
        stroke: '#00f'
    }
}));

const Chart = (props) => {
    const {
        title,
        aspect,
        data,
        xDataKey,
        areaDataKey,
    } = props;

    const styles = useStyles();

    const formatYAxis = (tickItem) => {
        if (Number.isInteger(tickItem)) {
            return tickItem;
        }
        return '';
    };

    return (
        <div className={styles.chart}>
            <Typography align='center' sx={{ mb: 1 }} variant='h6'>
                {title}
            </Typography>
            <ResponsiveContainer aspect={aspect || 3 / 2}>
                <AreaChart
                    data={data}
                >
                    <XAxis dataKey={xDataKey} stroke='#fff' />
                    <YAxis tickFormatter={formatYAxis} stroke='#fff' />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey={areaDataKey} stroke="#FF615A" fill='#FF615A' />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
};

export default Chart;
