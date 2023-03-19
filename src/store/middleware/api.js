import { createAction } from "@reduxjs/toolkit";
import axios from 'axios';
import store from "../_storeConfig";

export const ENDPOINTS = {
    customer: '/DTOUserCustomer',
    user: '/User',
    project: '/Project',
    login: '/LoginUser',
    endUser: '/Enduser',
    payment: '/Payment'
};

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallError = createAction('api/callError');

const api = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await axios.request({
            baseURL: 'https://localhost:7143/api',
            url,
            headers: {"Authorization" : `Bearer ${store.getState().login.token}`},
            method,
            data
        });
        
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
        else dispatch(apiCallSuccess(response.data));
    }
    catch (error) {
        if (onError) dispatch({ type: onError, payload: error.message })
        else dispatch(apiCallError(error.message));
    }
}

export default api;