import { createSlice } from "@reduxjs/toolkit";

// local imports
import { apiCallBegan, ENDPOINTS } from "./middleware/api";

const initialVars = {
    project: null,
    totalFee: '-',
    installments: '-',
    paybleAmount: '-',
    nextInstallment: '-',
    dueDate: '-',
    lastPayment: '-',
    lastPaymentDate: '-',
    clientSecret: '',
    message: '',
    category: 'Project'
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("sv-SE");
}

export const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        list: [],
        loading: false,
        variables: initialVars,
        searchParams: [
            'Project', 'Customer', 'Date'
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
        dataCleared: (state) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        },
        projectDetailsLoaded: (state, action) => {
            state.variables.totalFee = action.payload.totalFee;
            state.variables.installments = action.payload.installments;
            state.variables.paybleAmount = action.payload.paybleAmount;
            state.variables.nextInstallment = action.payload.nextInstallment;
            state.variables.dueDate = formatDate(action.payload.dueDate);
            state.variables.lastPayment = action.payload.lastPayment;
            state.variables.lastPaymentDate = formatDate(action.payload.lastPaymentDate);
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

export const getClientSecret = (projectId) => (dispatch) => {
    const stripeUrl = url + '/Stripe/' + projectId;

    dispatch(
        apiCallBegan({
            url: stripeUrl,
            method: 'post',
            data: projectId,
            onSuccess: clientSecretReceived.type,
        })
    );
}

export const loadProjectDetails = (projectId) => (dispatch) => {
    const projectUrl = url + '/Project/' + projectId;

    dispatch(
        apiCallBegan({
            url: projectUrl,
            method: 'post',
            data: projectId,
            onSuccess: projectDetailsLoaded.type,
        })
    );
}

export const loadPayments = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: paymentsRequested.type,
            onSuccess: paymentsReceived.type,
            onError: paymentsRequestFailed.type
        })
    );
};

export const addPayment = (projectId, clientSecret) => (dispatch) => {
    const stripeId = clientSecret.split('_secret_')[0];
    
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: { projectId, stripeId },
            onSuccess: paymentAdded.type,
        })
    );
};

export const clearData = () => (dispatch) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setPaymentData = (field, data) => (dispatch) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

// Selectors
