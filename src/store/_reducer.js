import { combineReducers, createSlice } from "@reduxjs/toolkit";

// local imports
import entitiesReducer from './_entities';
import loginReducer from './loginHandle';

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        status: 0,
    },
    reducers: {
        statusSet: (state, action) => {
            state.status = action.payload;
        }
    }
});

export default combineReducers({
    api: apiSlice.reducer,
    entities: entitiesReducer,
    login: loginReducer
});
