import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStyles } from '../Styles';

export function DrawerBody({ open }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { classes } = useStyles();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon className={classes.drawerIcon} />,
            path: '/dashboard'
        },
        {
            text: "Project Details",
            icon: <AccountTreeOutlinedIcon className={classes.drawerIcon} />,
            path: '/projects'
        },
        {
            text: "Customers",
            icon: <SupervisedUserCircleOutlinedIcon className={classes.drawerIcon} />,
            path: '/customers'
        },
        {
            text: "Users",
            icon: <SupportAgentOutlinedIcon className={classes.drawerIcon} />,
            path: '/users'
        },
        {
            text: "End Users",
            icon: <PermContactCalendarOutlinedIcon className={classes.drawerIcon} />,
            path: '/end-users'
        },
        {
            text: "Reports",
            icon: <ReceiptLongOutlinedIcon className={classes.drawerIcon} />,
            path: '/reports'
        },
        {
            text: "Feedback Forms",
            icon: <QuestionAnswerOutlinedIcon className={classes.drawerIcon} />,
            path: '/feedbacks'
        },
        {
            text: "Newsletters",
            icon: <UnsubscribeOutlinedIcon className={classes.drawerIcon} />,
            path: '/newsletters'
        },
        {
            text: "Payments",
            icon: <PaidOutlinedIcon className={classes.drawerIcon} />,
            path: '/payments'
        }
    ]

    return (
        <div className="drawer-body">
            <List className={classes.topicList}>
                {menuItems.map(item => (
                    <ListItem
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        className={(location.pathname === item.path) ? classes.active : null}
                        disablePadding sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} className={classes.drawerText} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
