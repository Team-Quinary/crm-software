import { createSlice } from "@reduxjs/toolkit";

// local imports
import { apiCallBegan, ENDPOINTS } from "./middleware/api";

export const emailSlice = createSlice({
    name: 'emails',
    initialState: {},
    reducers: {}
})

export default emailSlice.reducer;

// Action Creators

const url = ENDPOINTS.email;

export const sendNewsletter = (email) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: email
        })
    );
};