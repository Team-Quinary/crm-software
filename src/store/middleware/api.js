import { createAction } from "@reduxjs/toolkit";
import axios from 'axios';

// local imports
import store from "../_storeConfig";

export const ENDPOINTS = {
    customer: '/DTOUserCustomer',
    user: '/User',
    project: '/Project',
    loginBase: '/LoginUser',
    login: '/LoginUser/Login',
    authenticate: '/LoginUser/Authenticate',
    endUser: '/Enduser',
    payment: '/Payment',
    dashboard: '/User/Dashboard',
    progress: '/Progress',
    feedbackForm: '/FeedbackForm',
    feedbackSaveChanges: '/FeedbackForm/SaveChanges',
    email: '/Email',
};

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallError = createAction('api/callError');
export const loggedOut = createAction('login/loggedOut');

const api = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await axios.request({
            baseURL: 'https://localhost:7143/api', // environment variable
            url,
            headers: { "Authorization": `Bearer ${store.getState().login.token}` },
            method,
            data
        });

        dispatch({ type: 'api/statusSet', payload: response.status });

        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
        else dispatch(apiCallSuccess(response.data));
    }
    catch (error) {
        dispatch({ type: 'api/statusSet', payload: error.response.status });
        console.log(error);

        if (onError) dispatch({ type: onError, payload: error.message })
        else dispatch(apiCallError(error.message));
    }
}

export default api;
