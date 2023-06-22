import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import {
    addUser,
    clearData,
    updateUser,
    getUser,
    removeUser,
    setUserData,
    userTypes
} from '../../store/userHandle';

// local imports
import { Card, Confirm, MasonryGrid, Alert, SearchBar, DialogForm } from '../../components';

// styles
const useStyles = createUseStyles({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    }
});

const User = () => {
    const styles = useStyles();

    const users = useSelector((state) => state.entities.users.list);
    const isUsersLoading = useSelector((state) => state.entities.users.loading);

    const {
        type,
        firstName,
        lastName,
        contactNo,
        email,
        username,
        category,
        sortField,
        open,
    } = useSelector((state) => state.entities.users.variables);

    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchBoxText, setSearchBoxText] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const [userTypeError, setUserTypeError] = useState(false);
    let utError = false;

    const [firstNameError, setFirstNameError] = useState(false);
    let fError = false;

    const [lastNameError, setLastNameError] = useState(false);
    let lError = false;

    const [contactError, setContactError] = useState(false);
    let cNoError = false;

    const [emailError, setEmailError] = useState(false);
    let eError = false;

    const [usernameError, setusernameError] = useState(false);
    let uError = false;

    const handleClear = () => {
        store.dispatch(clearData());

        setSearchBoxText('');
        setUpdateId('');
        clearErrors();

        if (!isUpdate) setIsUpdate(false);
    };

    const clearErrors = () => {
        setUserTypeError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);

        utError = false;
        fError = false;
        lError = false;
        cNoError = false;
        eError = false;
        uError = false;
    };

    const updateUserStore = (name, value) => {
        store.dispatch(setUserData(name, value));
    };

    const validateForm = () => {
        clearErrors();

        let emailDuplicated = false;

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

        const mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email) || emailDuplicated) {
            setEmailError(true);
            eError = true;
        }

        if (username === '') {
            setusernameError(true);
            uError = true;
        }

        if (!(utError || fError || lError || cNoError || eError || (!isUpdate && uError)))
            return true;
        else
            return false;
    };

    const handleUserSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                type,
                username, firstName, lastName, contactNo, email,
                profilePic: '-',
                password: '',
            };

            store.dispatch(addUser(data));
            handleClear();
            updateUserStore('open', !open);
        }
    };

    const setUserToUpdate = (id) => {
        const user = getUser(id)(store.getState());

        updateUserStore('type', user.type);
        updateUserStore('firstName', user.firstName);
        updateUserStore('lastName', user.lastName);
        updateUserStore('contactNo', user.contactNo);
        updateUserStore('email', user.email);
        updateUserStore('open', true);

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleUserUpdate = () => {
        if (validateForm()) {
            const u = getUser(updateId)(store.getState());

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
                const data = {
                    type, firstName, lastName, contactNo, email
                };

                store.dispatch(updateUser(updateId, data));
            }

            updateUserStore('open', !open);
            setIsUpdate(!isUpdate);
        }
    };

    const handleUserDelete = () => {
        store.dispatch(removeUser(userToDelete.userId));
        setIsConfirmOpened(false);
    };

    const handleConfirmation = (user) => {
        setUserToDelete(user);
        setIsConfirmOpened(true);
    };

    const handleDialogClose = () => {
        updateUserStore('open', false);
        handleClear();
        setIsUpdate(false);
        setIsConfirmOpened(false);
        setUpdateId('');
    };

    useEffect(() => {
        if (open && !isUpdate) {
            updateUserStore('username', firstName.replace(/\s/g, '_'));
        }
    }, [open, isUpdate, firstName]);

    return (
        <div className='user'>
            <div className="searchbar-container">
                <SearchBar page="users" searchBoxText={searchBoxText} setSearchBoxText={setSearchBoxText} />
            </div>

            {
                isUsersLoading ? <div className="loading">Loading...</div> : <MasonryGrid>
                    {users
                        .filter(user =>
                            (category === 'name')
                                ? (user.firstName + " " + user.lastName).toLowerCase().includes(searchBoxText.toLowerCase())
                                : user[category].toLowerCase().includes(searchBoxText.toLowerCase())
                        )
                        .filter(user =>
                            (sortField !== 'all')
                                ? user.type.replace(/\s/g, '').toLowerCase() === sortField.toLowerCase()
                                : user.type !== 'Customer'
                        )
                        .map((user, index) => (
                            <Card
                                key={index}
                                updateOnClick={() => setUserToUpdate(user.userId)}
                                deleteOnClick={() => handleConfirmation(user)}
                                title={user.firstName + ' ' + user.lastName}
                                subheader={user.type}
                                cardContent={
                                    <div>
                                        <Typography>
                                            {user.contactNo}
                                        </Typography>
                                        <Typography>
                                            {user.email}
                                        </Typography>
                                    </div>
                                }
                            />
                        ))}
                </MasonryGrid>
            }

            <DialogForm
                isOpen={open}
                handleDialogClose={handleDialogClose}
                handleSave={handleUserSave}
                saveMsg={'Add a new User'}
                handleUpdate={handleUserUpdate}
                updateMsg={'Update existing User'}
                handleClear={handleClear}
                isUpdating={isUpdate}
            >
                <Autocomplete
                    value={type}
                    onChange={(_event_, newValue) => {
                        updateUserStore('type', newValue);
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
                    className={styles.field}
                    error={firstNameError}
                    helperText={firstNameError ? 'Can not be Empty' : null}
                    onChange={(e) => updateUserStore('firstName', e.target.value)}
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
                    className={styles.field}
                    error={lastNameError}
                    helperText={lastNameError ? "Can not be Empty" : null}
                    onChange={(e) => updateUserStore('lastName', e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    type='number'
                    name='contactNo'
                    value={contactNo}
                    label='Contact No'
                    variant='standard'
                    color='secondary'
                    className={styles.field}
                    error={contactError}
                    helperText={contactError ? "Can not be Empty" : null}
                    onChange={(e) => updateUserStore('contactNo', e.target.value)}
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
                    className={styles.field}
                    error={emailError}
                    helperText={emailError ? emailErrorMsg : null}
                    onChange={(e) => updateUserStore('email', e.target.value)}
                />

                {!isUpdate &&
                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='username'
                        value={username}
                        label='Username'
                        variant='standard'
                        color='secondary'
                        className={styles.field}
                        error={usernameError}
                        helperText={usernameError ? "Can not be Empty" : null}
                        onChange={(e) => updateUserStore('username', e.target.value)}
                    />
                }
            </DialogForm>

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={handleUserDelete}
            />

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="This is a Snackbar message!"
                severity="success"
            />
        </div>
    )
};

export default User;
