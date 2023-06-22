import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// material-ui imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
// material-ui Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';

// local imports
import { useStyles } from './Styles';

const DrawerBody = ({ isDrawerOpened }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const styles = useStyles();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon className={styles.drawerIcon} />,
            path: '/dashboard'
        },
        {
            text: "Project Details",
            icon: <AccountTreeOutlinedIcon className={styles.drawerIcon} />,
            path: '/projects'
        },
        {
            text: "Customers",
            icon: <SupervisedUserCircleOutlinedIcon className={styles.drawerIcon} />,
            path: '/customers'
        },
        {
            text: "Users",
            icon: <SupportAgentOutlinedIcon className={styles.drawerIcon} />,
            path: '/users'
        },
        {
            text: "End Users",
            icon: <PermContactCalendarOutlinedIcon className={styles.drawerIcon} />,
            path: '/end-users'
        },
        {
            text: "Reports",
            icon: <ReceiptLongOutlinedIcon className={styles.drawerIcon} />,
            path: '/reports'
        },
        {
            text: "Progress",
            icon: <EventRepeatIcon className={styles.drawerIcon} />,
            path: '/progress'
        },
        {
            text: "Feedback Forms",
            icon: <QuestionAnswerOutlinedIcon className={styles.drawerIcon} />,
            path: '/feedbackform'
        },
        {
            text: "Feedback Dashboard",
            icon: <TimelineIcon className={styles.drawerIcon} />,
            path: '/feedbackDashboard'
        },
        {
            text: "Newsletters",
            icon: <UnsubscribeOutlinedIcon className={styles.drawerIcon} />,
            path: '/newsletters'
        },
        {
            text: "Payments",
            icon: <PaidOutlinedIcon className={styles.drawerIcon} />,
            path: '/payments'
        }
    ];

    return (
        <div className="drawer-body">
            <List className={styles.drawerList}>
                {menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={(location.pathname === item.path) ? styles.drawerListItemActive : null}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <Tooltip title={isDrawerOpened ? '' : item.text} placement="right">
                            <ListItemButton
                                className={!isDrawerOpened ? styles.listItemButton : null}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: isDrawerOpened ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isDrawerOpened ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ opacity: isDrawerOpened ? 1 : 0 }} />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default DrawerBody;
