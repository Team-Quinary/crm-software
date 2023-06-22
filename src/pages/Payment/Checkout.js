import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

// redux imports
import { useSelector } from "react-redux";
import store from "../../store/_storeConfig";
import { addPayment, clearData, setPaymentData } from "../../store/paymentHandle";

export default function Checkout({ clientSecret, setOpen }) {
    const project = useSelector(state => state.entities.payments.variables.project);
    const [isLoading, setIsLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    store.dispatch(setPaymentData('message', "Payment succeeded!"));
                    break;
                case "processing":
                    store.dispatch(setPaymentData('message', "Your payment is processing."));
                    break;
                case "requires_payment_method":
                    store.dispatch(setPaymentData('message', "Enter Card details..."));
                    break;
                default:
                    store.dispatch(setPaymentData('message', "Something went wrong."));
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        console.log(typeof clientSecret);
        console.log(clientSecret);

        const { error } = await stripe.confirmCardPayment(
            clientSecret
        );

        if (error.type === "card_error" || error.type === "validation_error") {
            store.dispatch(setPaymentData('message', error.message));
            setIsLoading(false);
            return;
        }

        store.dispatch(addPayment(project.projectId, clientSecret));
        store.dispatch(clearData());
        store.dispatch(setPaymentData('message', 'Payment recorded successfully!'));
        setOpen(false);

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div className='checkout'>
            <form id="payment-form" onSubmit={handleSubmit} className="frmPayment">
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="payNow">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
            </form>
        </div>
    )
}
