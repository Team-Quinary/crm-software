import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import MuiCard from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// styles
const cardStyles = createUseStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.background.secondary,
        color: theme.palette.text.primary,
    },
    cardHeader: {
        backgroundColor: theme.palette.background.primary,
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 88px',
        alignItems: 'center',
    },
    cardSubHeader: {
        color: theme.palette.text.red,
        paddingTop: '5px',
        gridColumn: '1 / span 2',
        display: 'flex',
        alignItems: 'center',
    },
    actionBtn: {
        color: theme.palette.background.secondary,

        '&:hover': {
            backgroundColor: theme.palette.text.red,
            color: theme.palette.text.primary,
        },
    },
    cardContent: (padding) => ({
        padding: padding + 'px',
        color: theme.palette.text.default,
    })
}));

export const Card = (props) => {
    const {
        updateOnClick,
        deleteOnClick,
        title,
        subheader,
        cardContent,
        width,
        contentPadding = 10,
    } = props;

    const styles = cardStyles(contentPadding);

    const [isShowMore, setIsShowMore] = useState(false);

    return (
        <div>
            <MuiCard elevation={1} sx={{ width }} className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                        <Typography variant='h5'>{title}</Typography>
                    </div>
                    <div className={styles.cardAction}>
                        <Stack direction='row' spacing={1}>
                            <IconButton onClick={updateOnClick} className={styles.actionBtn}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton onClick={deleteOnClick} className={styles.actionBtn}>
                                <DeleteOutlined />
                            </IconButton>
                        </Stack>
                    </div>
                    {subheader && <div className={styles.cardSubHeader}>
                        <Typography style={{ flexGrow: 1 }}>{subheader}</Typography>
                        <IconButton onClick={() => setIsShowMore(!isShowMore)} style={{ color: '#fff' }}>
                            {!isShowMore ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                        </IconButton>
                    </div>}
                </div>
                {(isShowMore || !subheader) &&
                    <div className={styles.cardContent}>
                        {cardContent}
                    </div>
                }
            </MuiCard>
        </div>
    )
};

const customCardStyles = createUseStyles((theme) => ({
    card: {
        width: "250px",
        padding: "20px",
        marginRight: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
    },
    cardNumber: {
        fontSize: "50px",
        textAlign: "center",
        fontWeight: "bold",
        color: theme.palette.text.red,
    },
    summaryCount: {
        fontWeight: "bold",
        color: theme.palette.text.red,
    },
    projectSummary: {
        backgroundColor: theme.palette.background.paper,
        padding: "10px 20px",
        color: theme.palette.text.default,
        fontWeight: "bold",
        borderRadius: "16px",
        border: "1px solid rgba(0, 0, 0, 0.3)",

        "& .MuiTypography-root:not(:first-of-type)": {
            marginTop: "10px"
        },
    },
}));

export const CardWithcount = (props) => {
    const {
        title,
        count,
        summary
    } = props;

    const styles = customCardStyles();

    return (
        <div className={styles.card}>
            <Typography>{title}</Typography>
            <div className={styles.cardNumber}>{count}</div>
            {summary &&
                <div className={styles.projectSummary}>
                    {summary && summary.map((item, index) =>
                        <Typography key={index}>
                            {item.title}:
                            <span className={styles.summaryCount}>{item.count}</span>
                        </Typography>
                    )}
                </div>
            }
        </div>
    )
};
