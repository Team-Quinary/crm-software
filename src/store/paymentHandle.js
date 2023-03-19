import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

const initialVars = {
    project: null,
    totalFee: 0,
    installments: 0,
    paybleAmount: 0,
    nextInstallment: '-',
    dueDate: '-',
    lastPayment: '-',
    clientSecret: '',
    message: ''
};

export const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        list: [],
        loading: false,
        variables: initialVars,
        searchParams: [
            'Project', 'Amount', 'Date'
        ]
    },
    reducers: {
        clientSecretReceived: (state, action) => {
            state.variables.clientSecret = action.payload.clientSecret;
        },
        paymentsRequested: (state) => {
            state.loading = true;
        },
        paymentsRequestFailed: (state) => {
            state.loading = false;
        },
        paymentsReceived: (state, action) => {
            state.list = action.payload;

            state.loading = false;
        },
        paymentAdded: (state, action) => {
            state.list.push(action.payload);
        },
        dataCleared: (state, action) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        },
        projectDetailsLoaded: (state, action) => {

        }
    }
})

const {
    clientSecretReceived,
    paymentsRequested,
    paymentsRequestFailed,
    paymentsReceived,
    paymentAdded,
    dataCleared,
    dataSet,
    projectDetailsLoaded
} = paymentSlice.actions;

export default paymentSlice.reducer;

// Action Creators

const url = ENDPOINTS.payment;

export const getClientSecret = (projectId) => (dispatch, getState) => {
    const stripeUrl = url + '/Stripe';

    dispatch(
        apiCallBegan({
            url: stripeUrl,
            method: 'post',
            data: projectId,
            onSuccess: clientSecretReceived.type,
        })
    );
}

export const loadProjectDetails = (projectId) => (dispatch, getState) => {
    const projectUrl = url + '/Project';

    dispatch(
        apiCallBegan({
            url: projectUrl,
            method: 'post',
            data: projectId,
            onSuccess: projectDetailsLoaded.type,
        })
    );
}

export const loadPayments = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: paymentsRequested.type,
            onSuccess: paymentsReceived.type,
            onError: paymentsRequestFailed.type
        })
    );
};

export const addPayment = (projectId, clientSecret) => (dispatch, getState) => {
    const paymentId = clientSecret.split('_secret_')[0];
    
    dispatch(
        apiCallBegan({
            url: url,
            method: 'post',
            data: { projectId, paymentId },
            onSuccess: paymentAdded.type,
        })
    );
};

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setPaymentData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

// Selectors
