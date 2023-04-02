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
import { logOut, setLoginData } from '../store/loginHandle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function AppBarBody() {
    const { classes } = useStyles();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const [userWidth, setUserWidth] = useState(0);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    const usernameRef = useRef(null);
    const navigate = useNavigate();

    const {
        username,
        firstName,
        lastName,
        email,
        role,
        profilePic
    } = useSelector(state => state.login.currentUser);

    const [usernameError, setUsernameError] = useState(false);
    var uError = false;

    const [firstNameError, setFirstNameError] = useState(false);
    var fError = false;

    const [lastNameError, setLastNameError] = useState(false);
    var lError = false;

    const [emailError, setEmailError] = useState(false);
    var eError = false;

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    var pError = false;

    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    var cpError = false;

    const name = (firstName || 'unknown') + ' ' + (lastName || 'user');

    useEffect(() => {
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

    const handleDialogClose = () => {
        // store.dispatch(setCustomerData('open', !open));
        // handleClear();
        setEditProfileOpen(false);
    };

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
                    <MenuItem onClick={() => {
                        setDrop(!drop);
                        setEditProfileOpen(true);
                    }}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Edit Profil</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setDrop(!drop);
                        store.dispatch(logOut());
                        navigate('/');
                    }}>
                        <ListItemIcon>
                            <LogoutOutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </MenuItem>
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
            <Dialog
                open={editProfileOpen}
                onClose={handleDialogClose}
                fullWidth={true}
                maxWidth='md'
            >
                <DialogTitle>
                    Edit your profile
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type='text'
                        name='username'
                        value={username}
                        label='Username'
                        variant='standard'
                        color='secondary'
                        error={usernameError}
                        helperText={usernameError ? "Can not be Empty" : null}
                        onChange={(e) => store.dispatch(setLoginData('username', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='password'
                        name='contact-person'
                        value={password}
                        label='Password'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                    error={passwordError}
                    helperText={passwordError ? "Can not be Empty" : null}
                    // onChange={(e) => store.dispatch(setCustomerData('password', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='password'
                        name='contact-person'
                        // value={contactPerson}
                        label='Confirm Password'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                    // error={contactPersonError}
                    // helperText={contactPersonError ? "Can not be Empty" : null}
                    // onChange={(e) => store.dispatch(setCustomerData('contactPerson', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='contactNo'
                        // value={contactNo}
                        label='First Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                    // error={contactError}
                    // helperText={contactError ? "Can not be Empty" : null}
                    // onChange={(e) => store.dispatch(setCustomerData('contactNo', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='email'
                        // value={email}
                        label='Last Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                    // error={emailError}
                    // helperText={emailError ? emailErrorMsg : null}
                    // onChange={(e) => store.dispatch(setCustomerData('email', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='email'
                        name='email'
                        // value={email}
                        label='Email'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                    // error={emailError}
                    // helperText={emailError ? "Email is req" : null}
                    // onChange={(e) => store.dispatch(setCustomerData('email', e.target.value))}
                    />

                    <Stack direction='row' spacing={2} sx={{ mt: 3 }} justifyContent='right'>
                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant='outlined'
                        // onClick={handleClear}
                        >
                            Clear
                        </Button>

                        <Button
                            variant='contained'
                        // onClick={handleUpdate}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Toolbar>
    )
}