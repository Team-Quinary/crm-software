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
import { authenticateUser, logOut, updateProfile } from '../store/loginHandle';
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
    const [profilePic, setProfilePic] = useState('');

    const usernameRef = useRef(null);
    const navigate = useNavigate();
    
    const {
        userId,
        username,
        firstName,
        lastName,
        email,
        role,
        pic
    } = useSelector(state => state.login.currentUser);

    const [tempProfilePic, setTempProfilePic] = useState(pic);

    const [tempUsername, setTempUsername] = useState(username);
    const [usernameError, setUsernameError] = useState(false);
    var uError = false;

    const [tempFirstName, setTempFirstName] = useState(firstName);
    const [firstNameError, setFirstNameError] = useState(false);
    var fError = false;

    const [tempLastName, setTempLastName] = useState(lastName);
    const [lastNameError, setLastNameError] = useState(false);
    var lError = false;

    const [tempEmail, setTempEmail] = useState(email);
    const [emailError, setEmailError] = useState(false);
    var eError = false;

    const [contactNo, setContactNo] = useState('');
    const [contactError, setContactError] = useState(false);
    var cNoError = false;

    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    var cpError = false;

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    var pError = false;

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    var confirmError = false;

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

    const handleClear = () => {
        setTempUsername(username);
        setTempFirstName(firstName);
        setTempLastName(lastName);
        setTempEmail(email);
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
        setTempProfilePic(pic);
        setContactNo('');

        clearErrors();
    };

    const clearErrors = () => {
        setFirstNameError(false);
        setLastNameError(false);
        setUsernameError(false);
        setEmailError(false);
        setCurrentPasswordError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setContactError(false);

        fError = false;
        lError = false;
        uError = false;
        eError = false;
        cpError = false;
        pError = false;
        cpError = false;
        cNoError = false;
    };

    const handleDialogClose = () => {
        setEditProfileOpen(false);
        handleClear();
        setEditProfileOpen(false);
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setTempProfilePic(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveChanges = () => {
        clearErrors();

        if (tempUsername === '') {
            setUsernameError(true);
            uError = true;
        }

        if (tempFirstName === '') {
            setFirstNameError(true);
            fError = true;
        }

        if (tempLastName === '') {
            setLastNameError(true);
            lError = true;
        }

        if (tempEmail === '') {
            setEmailError(true);
            eError = true;
        }

        if (contactNo === '') {
            setContactError(true);
            cNoError = true;
        }

        if (currentPassword === '') {
            setCurrentPasswordError(true);
            cpError = true;
        }

        if (password === '') {
            setPasswordError(true);
            pError = true;
        }

        if (confirmPassword === '') {
            setConfirmPasswordError(true);
            cpError = true;
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
            pError = true;
            cpError = true;
        }

        if (!uError && !fError && !lError && !eError && !cNoError && !confirmError && !pError && !cpError) {
            store.dispatch(authenticateUser({ username: username, password: currentPassword }));

            const unsubscribe = store.subscribe(() => {
                const authenticated = store.getState().login.currentUser.verified;
                
                if (authenticated) {
                    unsubscribe();
                    
                    const data = {
                        type: role,
                        username: tempUsername,
                        firstName: tempFirstName,
                        lastName: tempLastName,
                        email: tempEmail,
                        contactNo,
                        password,
                        profilePic: tempProfilePic
                    };
        
                    store.dispatch(updateProfile(userId, data));
                }
                else {
                    unsubscribe();
                    alert("Current password is incorrect");
                }
            });

            handleDialogClose();
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setProfilePic(e.target.result);
          };
          reader.readAsDataURL(file);
        }
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
                        <ListItemText>Edit Profile</ListItemText>
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
            {pic === '-'
                ?
                <Avatar className={classes.avatar}>
                    {name[0].toUpperCase()}
                </Avatar>
                :
                <Avatar className={classes.avatar}
                    src={pic}
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
                <DialogContent sx={{ minHeight: '90vh' }}>
                    <div className={classes.projectFormContainer}>
                        <div>
                            {tempProfilePic && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', height: '210px' }}>
                                    <img src={tempProfilePic} width={'210px'} alt="Profile Pic" />
                                </div>
                            )}

                            <TextField
                                autoFocus
                                required
                                fullWidth
                                type="file"
                                accept="image/*"
                                name="profilePic"
                                variant="standard"
                                color="secondary"
                                onChange={handleProfilePicChange}
                                sx={{ marginTop: '35px' }}
                            />

                            <TextField
                                required
                                fullWidth
                                type='password'
                                name='currentPassword'
                                value={currentPassword}
                                label='Current Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={currentPasswordError}
                                helperText={currentPasswordError ? "Can not be Empty" : null}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                type='text'
                                name='username'
                                value={tempUsername}
                                label='Username'
                                variant='standard'
                                color='secondary'
                                error={usernameError}
                                helperText={usernameError ? "Can not be Empty" : null}
                                onChange={(e) => setTempUsername(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='password'
                                name='password'
                                value={password}
                                label='New Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={passwordError}
                                helperText={passwordError ? "Can not be Empty" : null}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='password'
                                name='confirmPassword'
                                value={confirmPassword}
                                label='Confirm Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={confirmPasswordError}
                                helperText={confirmPasswordError ? "Can not be Empty" : null}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='firstName'
                                value={tempFirstName}
                                label='First Name'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={firstNameError}
                                helperText={firstNameError ? "Can not be Empty" : null}
                                onChange={(e) => setTempFirstName(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='lastName'
                                value={tempLastName}
                                label='Last Name'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={lastNameError}
                                helperText={lastNameError ? 'Can not be Empty' : null}
                                onChange={(e) => setTempLastName(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='number'
                                name='contactNo'
                                value={contactNo}
                                label='Contatc No'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={contactError}
                                helperText={contactError ? "Contact No is required" : null}
                                onChange={(e) => setContactNo(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='email'
                                name='email'
                                value={tempEmail}
                                label='Email'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={emailError}
                                helperText={emailError ? "Email is required" : null}
                                onChange={(e) => setTempEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <Stack direction='row' spacing={2} sx={{ mt: 3 }} justifyContent='right'>
                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant='outlined'
                            onClick={handleClear}
                        >
                            Clear
                        </Button>

                        <Button
                            variant='contained'
                            onClick={saveChanges}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Toolbar>
    )
}