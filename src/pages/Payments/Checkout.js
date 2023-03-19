import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import store from "../../store/_storeConfig";
import { addPayment, setPaymentData } from "../../store/paymentHandle";

export default function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent.status === 'succeeded') {
                store.dispatch(setPaymentData('message', "Payment succeeded!"));
                store.dispatch(addPayment(1, clientSecret));
            }
            else {
                switch (paymentIntent.status) {
                    case "processing":
                        store.dispatch(setPaymentData('message', "Your payment is processing."));
                        break;
                    case "requires_payment_method":
                        store.dispatch(setPaymentData('message', "Your payment was not successful, please try again."));
                        break;
                    default:
                        store.dispatch(setPaymentData('message', "Something went wrong."));
                        break;
                }
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payments",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            store.dispatch(setPaymentData('message', error.message));
        } else {
            store.dispatch(setPaymentData('message', "An unexpected error occurred."));
        }

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
