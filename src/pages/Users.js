import React, { useState, useEffect } from 'react';
import { useStyles } from '../Styles';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Masonry from 'react-masonry-css';
import SearchBar from '../components/SearchBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { generate } from '@wcj/generate-password';
import { useSelector } from 'react-redux';
import store from '../store/_storeConfig';
import { addUser, clearData, updateUser, getUser, removeUser, setUserData, userTypes } from '../store/userHandle';

export default function Users() {
    const { classes } = useStyles();

    const {
        type,
        firstName,
        lastName,
        contactNo,
        email,
        username,
        password,
        category,
        sortField,
        open,
    } = useSelector((state) => state.entities.users.variables);

    const users = useSelector((state) => state.entities.users.list);
    const isUsersLoading = useSelector((state) => state.entities.users.loading);

    const [userTypeError, setUserTypeError] = useState(false);
    var utError = false;

    const [firstNameError, setFirstNameError] = useState(false);
    var fError = false;

    const [lastNameError, setLastNameError] = useState(false);
    var lError = false;

    const [contactError, setContactError] = useState(false);
    var cNoError = false;

    const [emailError, setEmailError] = useState(false);
    var eError = false;

    const [usernameError, setusernameError] = useState(false);
    var uError = false;

    const [passwordError, setPasswordError] = useState(false);
    var pError = false;

    const [search, setSearch] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const fullWidth = true;

    const breakpoints = {
        default: 4,
        1100: 3,
        830: 2
    }

    const handleClear = () => {
        store.dispatch(clearData());

        setSearch('');
        setUpdateId('');
        clearErrors();

        if (!isUpdate)
            setIsUpdate(false);
    };

    const clearErrors = () => {
        setUserTypeError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);
        setPasswordError(false);

        utError = false;
        fError = false;
        lError = false;
        cNoError = false;
        eError = false;
        uError = false;
        pError = false;
    };

    const validateForm = () => {
        clearErrors();

        var emailDuplicated = false;

        if (isUpdate) {
            emailDuplicated = users.some(user => user.email === email && user.userId !== updateId);
        }
        else {
            emailDuplicated = users.some(user => user.email === email);
        }

        setEmailErrorMsg(emailDuplicated ? 'Email is already recorded' : 'Invalid email format');

        if (type === '' || type === null) {
            setUserTypeError(true);
            utError = true;
        }

        if (firstName === '') {
            setFirstNameError(true);
            fError = true;
        }

        if (lastName === '') {
            setLastNameError(true)
            lError = true;
        }

        if (contactNo === '') {
            setContactError(true);
            cNoError = true;
        }

        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email) || emailDuplicated) {
            setEmailError(true);
            eError = true;
        }

        if (username === '') {
            setusernameError(true);
            uError = true;
        }

        if (password === '') {
            setPasswordError(true);
            pError = true;
        }

        if (!(utError || fError || lError || cNoError || eError || (!isUpdate && (uError || pError))))
            return true;
        else
            return false;
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var data = {
                type,
                username, password, firstName, lastName, contactNo, email,
                profilePic: '-'
            };

            store.dispatch(addUser(data));
            handleClear();
            store.dispatch(setUserData('open', !open));
        }
    };

    const handleDelete = (userId) => {
        store.dispatch(removeUser(userId));
    };

    const setToUpdate = (id) => {
        const user = getUser(id)(store.getState());
        
        store.dispatch(setUserData('type', user.type));
        store.dispatch(setUserData('firstName', user.firstName));
        store.dispatch(setUserData('lastName', user.lastName));
        store.dispatch(setUserData('contactNo', user.contactNo));
        store.dispatch(setUserData('email', user.email));
        store.dispatch(setUserData('open', true));

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleUpdate = () => {
        if (validateForm()) {
            var u = getUser(updateId)(store.getState());

            if (
                u.type === type &&
                u.firstName === firstName &&
                u.lastName === lastName &&
                u.contactNo === contactNo &&
                u.email === email
            ) {
                alert("Not changed...!");
            }
            else {
                var data = {
                    type, firstName, lastName, contactNo, email
                };

                store.dispatch(updateUser(updateId, data));
            }

            store.dispatch(setUserData('open', !open));
            setIsUpdate(!isUpdate);
        }
    };

    const userGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!isUsersLoading)
                    ? users
                        .filter(user =>
                            (category === 'name')
                                ? (user.firstName + " " + user.lastName).toLowerCase().includes(search.toLowerCase())
                                : user[category].toLowerCase().includes(search.toLowerCase())
                        )
                        .filter(user =>
                            (sortField !== 'all')
                                ? user.type.replace(/\s/g, '').toLowerCase() === sortField.toLowerCase()
                                : user.type !== 'Customer'
                        )
                        .map(user => (
                            <Card elevation={1} key={user.userId} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(user.userId)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.userId)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={user.firstName + " " + user.lastName}
                                    subheader={user.type}
                                    className={classes.customerCardHeader}
                                />
                                <Divider />
                                <div className={classes.customerContent}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {user.contactNo}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {user.email}
                                    </Typography>
                                </div>
                            </Card>
                        ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Masonry>
        )
    };

    const handleDialogClose = () => {
        store.dispatch(setUserData('open', !open));
        handleClear();
        setIsUpdate(false);
    };

    useEffect(() => {
        if (open && !isUpdate) {
            if (password === '') {
                var pwd = generate({ length: 10 });
                store.dispatch(setUserData('password', pwd));
            }
            store.dispatch(setUserData('username', firstName.replace(/\s/g, '_')));
        }
    }, [open, isUpdate, firstName, password]);

    return (
        <div className='users'>
            <div className={classes.searchBarContainer}>
                <SearchBar
                    page='users' search={search} setSearch={setSearch} 
                />
            </div>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth='xs'
            >
                <DialogTitle>
                    {isUpdate ? 'Update existing User' : 'Add a new User'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Autocomplete
                        value={type}
                        onChange={(event, newValue) => {
                            store.dispatch(setUserData('type', newValue));
                        }}
                        disablePortal
                        options={userTypes}
                        renderInput={({ inputProps, ...rest }) =>
                            <TextField {...rest}
                                autoFocus
                                required
                                fullWidth
                                name='type'
                                label='User Type'
                                variant='standard'
                                color='secondary'
                                inputProps={{ ...inputProps, readOnly: true }}
                            />
                        }
                    />
                    {userTypeError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a user Type</span>}

                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type='text'
                        name='firstName'
                        value={firstName}
                        label='First Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={firstNameError}
                        helperText={firstNameError ? 'Can not be Empty' : null}
                        onChange={(e) => store.dispatch(setUserData('firstName', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='lastName'
                        value={lastName}
                        label='Last Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={lastNameError}
                        helperText={lastNameError ? "Can not be Empty" : null}
                        onChange={(e) => store.dispatch(setUserData('lastName', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='contactNo'
                        value={contactNo}
                        label='Contact No'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={contactError}
                        helperText={contactError ? "Can not be Empty" : null}
                        onChange={(e) => store.dispatch(setUserData('contactNo', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={emailError}
                        helperText={emailError ? emailErrorMsg : null}
                        onChange={(e) => store.dispatch(setUserData('email', e.target.value))}
                    />

                    {!isUpdate &&
                        <>
                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='username'
                                value={username}
                                label='Username'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={usernameError}
                                helperText={usernameError ? "Can not be Empty" : null}
                                onChange={(e) => store.dispatch(setUserData('username', e.target.value))}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='password'
                                value={password}
                                label='Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={passwordError}
                                helperText={passwordError ? "Can not be Empty" : null}
                                onChange={(e) => store.dispatch(setUserData('password', e.target.value))}
                            />
                        </>
                    }

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
                            onClick={(isUpdate) ? handleUpdate : handleSave}
                        >
                            {(isUpdate) ? 'Update' : 'Save'}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            {userGrid()}
        </div>
    )
}
