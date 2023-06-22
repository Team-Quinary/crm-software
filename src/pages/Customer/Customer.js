import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

// material-ui imports
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// redux imports
import { useSelector } from 'react-redux';
import store from '../../store/_storeConfig';
import {
    addCustomer,
    removeCustomer,
    updateCustomer,
    setCustomerData,
    clearData,
    getCustomer
} from '../../store/customerHandle';

// local imports
import { Card, Confirm, MasonryGrid, Alert, SearchBar, DialogForm } from '../../components';

// styles
const useStyles = createUseStyles({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    }
});

const Customer = () => {
    const styles = useStyles();

    const customers = useSelector(state => state.entities.customers.list);
    const isCustomersLoading = useSelector((state) => state.entities.customers.loading);

    const {
        company,
        contactPerson,
        contactNo,
        email,
        username,
        category,
        open
    } = useSelector((state) => state.entities.customers.variables);

    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [searchBoxText, setSearchBoxText] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [companyErrorMsg, setCompanyErrorMsg] = useState('');

    const [companyError, setCompanyError] = useState(false);
    let cError = false;

    const [contactPersonError, setContactPersonError] = useState(false);
    let cpError = false;

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
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);

        cError = false;
        cpError = false;
        cNoError = false;
        eError = false;
        uError = false;
    };

    const updateCustomerStore = (name, value) => {
        store.dispatch(setCustomerData(name, value));
    };

    const validateForm = () => {
        clearErrors();

        let companyDuplicated = false;
        let emailDuplicated = false;

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

        const mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email) || emailDuplicated) {
            setEmailError(true);
            eError = true;
        }

        if (username === '') {
            setusernameError(true);
            uError = true;
        }

        if (!(cError || cpError || cNoError || eError || (!isUpdate && uError)) && company)
            return true;
        else
            return false;
    };

    const handleCustomerSave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            let [firstName, ...lastName] = contactPerson.split(' ');
            lastName = lastName.join(' ');

            const data = {
                type: "Customer",
                username, firstName, lastName, contactNo, email,
                profilePic: '-', company
            };

            store.dispatch(addCustomer(data));
            handleClear();
            updateCustomerStore('open', !open);
        }
    };

    const setCustomerToUpdate = (id) => {
        const customer = getCustomer(id)(store.getState());

        updateCustomerStore('company', customer.company);
        updateCustomerStore('contactPerson', customer.firstName + ' ' + customer.lastName);
        updateCustomerStore('contactNo', customer.contactNo);
        updateCustomerStore('email', customer.email);
        updateCustomerStore('open', true);

        setIsUpdate(true);
        setUpdateId(id);
    };

    const handleCustomerUpdate = () => {
        if (validateForm()) {
            const cus = getCustomer(updateId)(store.getState());

            if (
                cus.company === company &&
                (cus.firstName + ' ' + cus.lastName) === contactPerson &&
                cus.contactNo === contactNo &&
                cus.email === email
            ) {
                alert("Not changed...!");
            }
            else {
                let [firstName, ...lastName] = contactPerson.split(' ');
                lastName = lastName.join(' ');

                const data = {
                    firstName, lastName, contactNo, email, company
                };

                store.dispatch(updateCustomer(updateId, data));
            }

            updateCustomerStore('open', !open);
            setIsUpdate(!isUpdate);
        }
    };

    const handleCustomerDelete = () => {
        store.dispatch(removeCustomer(customerToDelete.userId));
        setIsConfirmOpened(false);
    };

    const handleConfirmation = (customer) => {
        setCustomerToDelete(customer);
        setIsConfirmOpened(true);
    };

    const handleDialogClose = () => {
        updateCustomerStore('open', false);
        handleClear();
        setIsUpdate(false);
        setIsConfirmOpened(false);
        setUpdateId('');
    };

    useEffect(() => {
        if (open && !isUpdate) {
            updateCustomerStore('username', company.replace(/\s/g, '_'));
        }
    }, [open, isUpdate, company]);

    return (
        <div className='customer'>
            <div className="searchbar-container">
                <SearchBar page="customers" searchBoxText={searchBoxText} setSearchBoxText={setSearchBoxText} />
            </div>

            {
                isCustomersLoading ? <div className="loading">Loading...</div> : <MasonryGrid>
                    {customers
                        .filter(customer =>
                            (category === 'contactPerson')
                                ? (customer.firstName + " " + customer.lastName).toLowerCase().includes(searchBoxText.toLowerCase())
                                : customer[category].toLowerCase().includes(searchBoxText.toLowerCase())
                        )
                        .map((customer, index) => (
                            <Card
                                key={index}
                                updateOnClick={() => setCustomerToUpdate(customer.userId)}
                                deleteOnClick={() => handleConfirmation(customer)}
                                title={customer.username}
                                subheader={customer.firstName + ' ' + customer.lastName}
                                cardContent={
                                    <div>
                                        <Typography>
                                            {customer.contactNo}
                                        </Typography>
                                        <Typography>
                                            {customer.email}
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
                handleSave={handleCustomerSave}
                saveMsg={'Add a new Customer'}
                handleUpdate={handleCustomerUpdate}
                updateMsg={'Update existing Customer'}
                handleClear={handleClear}
                isUpdating={isUpdate}
            >
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
                    className={styles.field}
                    helperText={companyError ? companyErrorMsg : null}
                    onChange={(e) => updateCustomerStore('company', e.target.value)}
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
                    error={contactPersonError}
                    className={styles.field}
                    helperText={contactPersonError ? "Can not be Empty" : null}
                    onChange={(e) => updateCustomerStore('contactPerson', e.target.value)}
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
                    error={contactError}
                    className={styles.field}
                    helperText={contactError ? "Can not be Empty" : null}
                    onChange={(e) => updateCustomerStore('contactNo', e.target.value)}
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
                    error={emailError}
                    className={styles.field}
                    helperText={emailError ? emailErrorMsg : null}
                    onChange={(e) => updateCustomerStore('email', e.target.value)}
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
                        error={usernameError}
                        className={styles.field}
                        helperText={usernameError ? "Can not be Empty" : null}
                        onChange={(e) => updateCustomerStore('username', e.target.value)}
                    />
                }
            </DialogForm>

            <Confirm
                state={{ isConfirmOpened, setIsConfirmOpened }}
                onYesClick={handleCustomerDelete}
            />

            <Alert
                state={{ isAlertOpened, setIsAlertOpened }}
                message="This is a Snackbar message!"
                severity="success"
            />
        </div>
    )
};

export default Customer;
