import { configureStore } from "@reduxjs/toolkit";
import reducer from './_reducer';
import api from './middleware/api';

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api)
})

export default store;