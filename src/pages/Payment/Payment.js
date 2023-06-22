import React, { useEffect, useState } from "react";
import { createUseStyles } from 'react-jss';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// material-ui imports
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// redux imports
import { useSelector } from "react-redux";
import store from "../../store/_storeConfig";
import { getClientSecret, loadProjectDetails, setPaymentData } from "../../store/paymentHandle";

// local imports
import { SearchBox, EnhancedTable } from '../../components';
import Checkout from "./Checkout";
import './Styles.css';

// styles
const useStyles = createUseStyles((theme) => ({
    field: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    paymentTable: {
        // overflowY: 'scroll',
        // maxHeight: '50vh',
    },
    paymentsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        columnGap: '20px',
        padding: '20px',
    },
    payments: {
        overflowY: 'scroll',
        height: '72vh',
    },
    paymentDetailField: {
        marginBottom: '12px'
    },
    paymentDetailsArea: {
        borderRadius: '8px',
        border: '1px solid black',
        marginBottom: '20px',
        backgroundColor: '#fff',
    },
    paymentHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        minHeight: '48px',
        borderBottom: '1px solid black',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
        padding: '15px',
        // fontSize: '2erm'
    },
    projectDetailsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '20px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        padding: '20px',
    },
    payNext: {
        marginTop: '10px',
        backgroundColor: '#6c85bb'
    },
    paymentSearchBar: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid lightgray',
        padding: '5px',
        paddingLeft: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    searchBy: {
        color: theme.palette.text.red,
        whiteSpace: 'nowrap',
        fontWeight: 500,
    },
    dialogTitle: {
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
    },
    endUserButton: {
        margin: '10px 0',
        width: '100%'
    },
}));

const stripePromise = loadStripe("pk_test_51MUsoZAohmapaowNfCCAq0VgDtiwa4oelYilafpDtugHTyYXKuEfUc9qtlr3PJYXPCW7ikrqUbdtuoS5EDzyOk8v00TYupu58G");

const Payment = () => {
    const styles = useStyles();

    const clientSecret = useSelector(state => state.entities.payments.variables.clientSecret);
    // const message = useSelector(state => state.entities.payments.variables.message);
    const projects = useSelector(state => state.entities.projects.list);

    const searchList = useSelector(state => state.entities.payments.searchParams)
    const category = useSelector(state => state.entities.payments.variables.category)

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const {
        project,
        totalFee,
        installments,
        paybleAmount,
        nextInstallment,
        dueDate,
        lastPayment,
        lastPaymentDate
    } = useSelector(state => state.entities.payments.variables);

    useEffect(() => {
        if (project) {
            console.log(project)
            store.dispatch(getClientSecret(project.projectId));
        }
    }, [project]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    return (
        <div className='payments'>
            <div className={styles.paymentsContainer}>
                <div>
                    <div className={styles.paymentSearchBar}>
                        <Stack
                            direction='row'
                            spacing={2}
                            alignItems='center'
                            justifyContent='right'
                            className={styles.searchStack}
                        >
                            <Typography className={styles.searchBy}>Search by : </Typography>
                            <Autocomplete
                                options={searchList}
                                value={category}
                                onChange={(_event_, newValue) => {
                                    store.dispatch(setPaymentData('category', newValue));
                                }}
                                disablePortal
                                renderInput={({ inputProps, ...rest }) =>
                                    <TextField {...rest}
                                        name='type'
                                        variant='outlined'
                                        inputProps={{ ...inputProps, readOnly: true }}
                                        size='small'
                                        sx={{ width: '200px' }}
                                    />
                                }
                            />
                            <SearchBox
                                placeholder={'...'}
                                searchBoxText={search}
                                setSearchBoxText={setSearch}
                            />
                        </Stack>
                    </div>
                    <div className={styles.payments}>
                        <EnhancedTable search={search} />
                    </div>
                </div>
                <div>
                    <div className={styles.paymentDetailsArea}>
                        <div className={styles.paymentHeader}>
                            <Typography align='center' variant='h5' sx={{ fontWeight: 400 }}>
                                Project Details
                            </Typography>
                        </div>

                        <Autocomplete
                            options={projects}
                            getOptionLabel={(option) => option.name}
                            value={project}
                            onChange={(_event_, value) => {
                                store.dispatch(setPaymentData('project', value));
                                (value !== null && value !== undefined) && store.dispatch(loadProjectDetails(value.projectId))
                            }}
                            renderInput={({ inputProps, ...rest }) =>
                                <TextField {...rest}
                                    required
                                    name='type'
                                    label='Select a Project'
                                    variant='standard'
                                    color='secondary'
                                    inputProps={{ ...inputProps }}
                                />
                            }
                            sx={{ padding: '10px' }}
                        />

                        <div className={styles.projectDetailsContainer}>
                            <Typography className={styles.paymentDetailField}>Total Fee</Typography>
                            <Typography color='gray' className={styles.paymentDetailField}>: {totalFee}</Typography>

                            <Typography className={styles.paymentDetailField}>Installments</Typography>
                            <Typography color='gray' className={styles.paymentDetailField}>: {installments}</Typography>

                            <Typography className={styles.paymentDetailField}>Payble Amount</Typography>
                            <Typography color='gray' className={styles.paymentDetailField}>: {paybleAmount}</Typography>

                            <Typography className={styles.paymentDetailField}>Next Payment</Typography>
                            <Typography color='gray' className={styles.paymentDetailField}>: {nextInstallment}</Typography>

                            <Typography className={styles.paymentDetailField}>Due Date</Typography>
                            <Typography color='gray' className={styles.paymentDetailField}>: {(paybleAmount <= 0) ? '-' : dueDate}</Typography>

                            <Typography className={styles.paymentDetailField}>Last Payment</Typography>
                            <Typography color='gray'>: {lastPayment}</Typography>

                            <Typography>Payment Date</Typography>
                            <Typography color='gray'>: {lastPaymentDate === '1-01-01' ? '-' : lastPaymentDate}</Typography>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        variant='contained'
                        onClick={() => setOpen(!open)}
                        disabled={project === null || nextInstallment <= 0}
                    >
                        Pay Next Installment
                    </Button>

                    {/* {message && <div id="payment-message">{message}</div>} */}
                </div>
                <Dialog
                    open={open}
                    // onClose={handleDialogClose}
                    maxWidth='xs'
                >
                    <DialogTitle className={styles.dialogTitle}>
                        Pay next Installment
                    </DialogTitle>
                    <DialogContent>
                        <Typography align="center" variant="h5" sx={{ padding: '20px 20px 10px 20px' }}> 
                            {(project !== null) ? project.name : '-'} : {nextInstallment} /=
                        </Typography>

                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <Checkout clientSecret={clientSecret} setOpen={setOpen} />
                            </Elements>
                        )}

                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                            className={styles.endUserButton}
                            sx={{ minHeight: '40px' }}
                        >
                            Pay Later
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
};

export default Payment;
