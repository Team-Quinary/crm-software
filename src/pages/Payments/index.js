import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { getClientSecret, loadProjectDetails, setPaymentData } from "../../store/paymentHandle";
import { useStyles } from '../../Styles';
import { Autocomplete, Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Checkout from "./Checkout";
import store from "../../store/_storeConfig";
import './Styles.css';
import EnhancedTable from "../../components/EnhancedTable";

const stripePromise = loadStripe("pk_test_51MUsoZAohmapaowNfCCAq0VgDtiwa4oelYilafpDtugHTyYXKuEfUc9qtlr3PJYXPCW7ikrqUbdtuoS5EDzyOk8v00TYupu58G");

export default function Payments() {
    const { classes } = useStyles();

    const clientSecret = useSelector(state => state.entities.payments.variables.clientSecret);
    const message = useSelector(state => state.entities.payments.variables.message);
    const payments = useSelector(state => state.entities.payments.list);
    const projects = useSelector(state => state.entities.projects.list);

    const [open, setOpen] = useState();

    const {
        project,
        totalFee,
        installments,
        paybleAmount,
        nextInstallment,
        dueDate,
        lastPayment
    } = useSelector(state => state.entities.payments.variables);

    useEffect(() => {
        store.dispatch(getClientSecret({ items: [{ id: "xl-tshirt" }] }));
    }, []);

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
            <div className={classes.paymentsContainer}>
                <div>
                    <div className={classes.payments}>
                        <EnhancedTable />
                    </div>
                </div>
                <div>
                    <div className={classes.paymentDetailsArea}>
                        <div className={classes.paymentHeader}>
                            <Typography align='center' variant='h5'>Project Details</Typography>
                        </div>

                        <Autocomplete
                            options={projects}
                            getOptionLabel={(option) => option.name}
                            value={project}
                            onChange={(event, value) => {
                                store.dispatch(setPaymentData('project', value));
                                (value !== null && value !== undefined) && store.dispatch(loadProjectDetails(value.projectId))
                            }}
                            renderInput={({ inputProps, ...rest }) =>
                                <TextField {...rest}
                                    required
                                    name='type'
                                    label='Project'
                                    variant='standard'
                                    color='secondary'
                                    inputProps={{ ...inputProps }}
                                />
                            }
                            sx={{ padding: '10px' }}
                        />

                        <div className={classes.projectDetailsContainer}>
                            <Typography className={classes.paymentDetailField}>Total Fee</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {totalFee}</Typography>

                            <Typography className={classes.paymentDetailField}>Installments</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {installments}</Typography>

                            <Typography className={classes.paymentDetailField}>Payble Amount</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {paybleAmount}</Typography>

                            <Typography className={classes.paymentDetailField}>Next Installment</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {nextInstallment}</Typography>

                            <Typography className={classes.paymentDetailField}>Due Date</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {dueDate}</Typography>

                            <Typography>Last Payment</Typography>
                            <Typography color='gray'>: {lastPayment}</Typography>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        variant='contained'
                        onClick={() => setOpen(!open)}
                    // className={classes.payNext}
                    >
                        Pay Next Installment
                    </Button>

                    {message && <div id="payment-message">{message}</div>}
                </div>
                <Dialog
                    open={open}
                    onClose={handleDialogClose}
                    maxWidth='xs'
                >
                    <DialogContent>
                        <div className={classes.projectDetailsContainer}>
                            <Typography className={classes.paymentDetailField} varient='h6'>Project</Typography>
                            <Typography color='gray' className={classes.paymentDetailField}>: {(project !== null) ? project.name : '-'}</Typography>

                            <Typography varient='h6'>Amount</Typography>
                            <Typography color='gray'>: {nextInstallment}</Typography>
                        </div>

                        {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <Checkout />
                            </Elements>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
