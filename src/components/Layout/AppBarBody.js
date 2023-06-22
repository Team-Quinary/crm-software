import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui imports
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// local imports
import { useStyles } from './Styles';

const AppBarBody = (props) => {
    const {
        name,
        role,
        pic,
        editProfileOnClick,
        logOutOnClick
    } = props;

    const styles = useStyles();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
    const [userWidth, setUserWidth] = useState(0);

    const usernameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUserWidth(usernameRef.current.clientWidth);
    }, [name]);

    const handleOpenUserMenu = () => {
        setAnchorElUser(usernameRef.current);
        setIsUserMenuOpened(true);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setIsUserMenuOpened(false);
    };

    return (
        <div className="appbar-body">
            <Toolbar>
                <div className={styles.usernameArea}>
                    <Typography
                        variant='h6'
                        onClick={handleOpenUserMenu}
                        className={styles.username}
                        ref={usernameRef}
                        align='center'
                    >
                        {name}
                    </Typography>

                    <IconButton onClick={handleOpenUserMenu}>
                        {!isUserMenuOpened ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                    </IconButton>
                    
                    <Menu
                        sx={{
                            '& .MuiMenu-paper': {
                                width: `${userWidth}px`,
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
                        className={styles.hiddenMenu}
                    >
                        <MenuItem className={styles.userType} disabled={true}>
                            <Typography>{role}</Typography>
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={() => {
                            setIsUserMenuOpened(false);
                            editProfileOnClick();
                        }}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText>Edit Profile</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={() => {
                            setIsUserMenuOpened(false);
                            logOutOnClick();
                            navigate('/');
                        }}>
                            <ListItemIcon>
                                <LogoutOutlinedIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText>Log out</ListItemText>
                        </MenuItem>
                    </Menu>
                </div>
                <Avatar className={styles.userProfile} src={(pic === '-' || pic === '') ? undefined : pic}>
                    {pic === '-' ? name[0].toUpperCase() : undefined}
                </Avatar>
            </Toolbar>
        </div>
    )
}

export default AppBarBody;
