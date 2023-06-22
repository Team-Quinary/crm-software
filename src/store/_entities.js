import { combineReducers } from "@reduxjs/toolkit";

// local imports
import customerReducer from './customerHandle';
import userReducer from './userHandle';
import projectReducer from './projectHandle';
import saleReducer from './saleHandle';
import paymentReducer from './paymentHandle';
import progressReducer from './progressHandle';
import feedbackFormReducer from "./feedbackFormHandle";

export default combineReducers({
    customers: customerReducer,
    users: userReducer,
    projects: projectReducer,
    sales: saleReducer,
    payments: paymentReducer,
    progress: progressReducer,
    feedbackForms: feedbackFormReducer,
});