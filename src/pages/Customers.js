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
import { generate } from '@wcj/generate-password';
import store from '../store/_storeConfig';
import { useSelector } from 'react-redux';
import { 
    addCustomer, 
    removeCustomer, 
    updateCustomer, 
    setCustomerData, 
    clearData, 
    getCustomer 
} from '../store/customerHandle';

function Customers() {
    const { classes } = useStyles();

    const {
        company,
        contactPerson,
        contactNo,
        email,
        username,
        password,
        category,
        open
    } = useSelector((state) => state.entities.customers.variables);

    const customers = useSelector((state) => state.entities.customers.list);
    const isCustomersLoading = useSelector((state) => state.entities.customers.loading);

    const [companyError, setCompanyError] = useState(false);
    var cError = false;

    const [contactPersonError, setContactPersonError] = useState(false);
    var cpError = false;

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
    const [companyErrorMsg, setCompanyErrorMsg] = useState('');

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
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);
        setPasswordError(false);

        cError = false;
        cpError = false;
        cNoError = false;
        eError = false;
        uError = false;
        pError = false;
    };

    const validateForm = () => {
        clearErrors();

        var companyDuplicated = false;
        var emailDuplicated = false;

        if (isUpdate) {
            companyDuplicated = customers.some(customer => 
                customer.company === company && customer.userId !== updateId);
            emailDuplicated = customers.some(customer => 
                customer.email === email && customer.userId !== updateId);
        }
        else {
            companyDuplicated = customers.some(customer => customer.company === company);
            emailDuplicated = customers.some(customer => customer.email === email);
        }

        setCompanyErrorMsg(companyDuplicated ? 
            'Company name is taken, try another' : 'Invalid email format');
        setEmailErrorMsg(emailDuplicated ? 
            'Email is already recorded' : 'Invalid email format');

        if (company === '' || companyDuplicated) {
            setCompanyError(true);
            cError = true;
        }

        if (contactPerson === '') {
            setContactPersonError(true)
            cpError = true;
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

        if (!(cError || cpError || cNoError || eError || (!isUpdate && (uError || pError))) && company)
            return true;
        else
            return false;
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var [firstName, ...lastName] = contactPerson.split(' ');
            lastName = lastName.join(' ');

            var data = {
                type: "Customer",
                username, password, firstName, lastName, contactNo, email,
                profilePic: '-', company
            };

            store.dispatch(addCustomer(data));
            handleClear();
            store.dispatch(setCustomerData('open', !open));
        }
    };

    const handleDelete = (userId) => {
        store.dispatch(removeCustomer(userId));
    };

    const setToUpdate = (id) => {
        const customer = getCustomer(id)(store.getState());

        store.dispatch(setCustomerData('company', customer.company));
        store.dispatch(setCustomerData('contactPerson', customer.firstName + ' ' + customer.lastName));
        store.dispatch(setCustomerData('contactNo', customer.contactNo));
        store.dispatch(setCustomerData('email', customer.email));
        store.dispatch(setCustomerData('open', true));

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleUpdate = () => {
        if (validateForm()) {
            var cus = getCustomer(updateId)(store.getState());

            if (
                cus.company === company &&
                (cus.firstName + ' ' + cus.lastName) === contactPerson &&
                cus.contactNo === contactNo &&
                cus.email === email
            ) {
                alert("Not changed...!");
            }
            else {
                var [firstName, ...lastName] = contactPerson.split(' ');
                lastName = lastName.join(' ');

                var data = {
                    firstName, lastName, contactNo, email, company
                };

                store.dispatch(updateCustomer(updateId, data));
            }

            store.dispatch(setCustomerData('open', !open));
            setIsUpdate(!isUpdate);
        }
    }

    const customerGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!isCustomersLoading)
                    ? customers
                        .filter(customer =>
                            (category === 'contactPerson')
                                ? (customer.firstName + " " + customer.lastName).toLowerCase().includes(search.toLowerCase())
                                : customer[category].toLowerCase().includes(search.toLowerCase())
                        )
                        .map(customer => (
                            <Card elevation={1} key={customer.userId} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(customer.userId)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(customer.userId)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={customer.company}
                                    subheader={customer.firstName + " " + customer.lastName}
                                    className={classes.customerCardHeader}
                                />
                                <Divider />
                                <div className={classes.customerContent}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {customer.contactNo}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {customer.email}
                                    </Typography>
                                </div>
                            </Card>
                        ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Masonry>
        )
    };

    const handleDialogClose = () => {
        store.dispatch(setCustomerData('open', !open));
        handleClear();
        setIsUpdate(false);
    };

    useEffect(() => {
        if (open && !isUpdate) {
            if (password === '') {
                var pwd = generate({ length: 10 });
                store.dispatch(setCustomerData('password', pwd));
            }
            store.dispatch(setCustomerData('username', company.replace(/\s/g, '_')));
        }
    }, [open, isUpdate, company, password]);

    return (
        <div className='customers'>
            <div className={classes.searchBarContainer}>
                <SearchBar
                    page='customers' search={search} setSearch={setSearch}
                />
            </div>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth='xs'
            >
                <DialogTitle>
                    {isUpdate ? 'Update existing Customer' : 'Add a new Customer'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type='text'
                        name='company'
                        value={company}
                        label='Company'
                        variant='standard'
                        color='secondary'
                        error={companyError}
                        helperText={companyError ? companyErrorMsg : null}
                        onChange={(e) => store.dispatch(setCustomerData('company', e.target.value))}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='contact-person'
                        value={contactPerson}
                        label='Contact Person'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={contactPersonError}
                        helperText={contactPersonError ? "Can not be Empty" : null}
                        onChange={(e) => store.dispatch(setCustomerData('contactPerson', e.target.value))}
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
                        onChange={(e) => store.dispatch(setCustomerData('contactNo', e.target.value))}
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
                        onChange={(e) => store.dispatch(setCustomerData('email', e.target.value))}
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
                                onChange={(e) => store.dispatch(setCustomerData('username', e.target.value))}
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
                                onChange={(e) => store.dispatch(setCustomerData('password', e.target.value))}
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
            {customerGrid()}
        </div>
    )
}

export default Customers;
