import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useStyles } from '../Styles';
import { Divider, IconButton, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store/_storeConfig';
import { logOut } from '../store/loginHandle';

export function AppBarBody() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const [userWidth, setUserWidth] = useState(0);
    const { classes } = useStyles();
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    const name = useSelector(state => state.login.currentUser.name);
    const role = useSelector(state => state.login.currentUser.role);
    const profilePic = useSelector(state => state.login.currentUser.pic);

    useEffect(() => {
        // let width = usernameRef.current.clientWidth;
        // setUserWidth(width > 150 ? width : 150);
        setUserWidth(usernameRef.current.clientWidth);
    }, [name]);

    const handleOpenUserMenu = () => {
        setAnchorElUser(usernameRef.current);
        setDrop(!drop);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    const userMenuItems = [
        {
            text: "Edit Profile",
            icon: <AccountCircleIcon fontSize='small' />,
            path: '/edit-profile'
        },
        {
            text: "Log out",
            icon: <LogoutOutlinedIcon fontSize='small' />,
            path: '/'
        }
    ]

    return (
        <Toolbar className={classes.toolbar}>
            <div className={classes.avatarContainer}>
                <Typography
                    variant='h6'
                    onClick={handleOpenUserMenu}
                    className={classes.avatarUsername}
                    ref={usernameRef}
                    align='center'
                >
                    {name}
                </Typography>
                <IconButton
                    onClick={handleOpenUserMenu}
                    className={classes.dropIcon}>
                    {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                </IconButton>
                <Menu
                    sx={{
                        '& .MuiMenu-paper': {
                            width: `${userWidth}px`,
                            marginTop: '10px'
                        }
                    }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className={classes.hiddenMenu}
                >
                    <MenuItem sx={{ bottom: '-5px' }} disabled={true}>
                        <Typography className={classes.userType}>{role}</Typography>
                    </MenuItem>
                    <Divider />
                    {userMenuItems.map(item => (
                        <MenuItem key={item.text} onClick={() => {
                            setDrop(!drop);
                            if (item.text === 'Log out') store.dispatch(logOut());
                            navigate(item.path);
                        }}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            {profilePic === '-'
                ?
                <Avatar className={classes.avatar}>
                    {name[0].toUpperCase()}
                </Avatar>
                : 
                <Avatar className={classes.avatar}
                    src={profilePic}
                />
            }
        </Toolbar>
    )
}