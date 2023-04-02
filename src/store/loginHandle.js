import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

const initialUser = {
    userId: null,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'unknown',
    pic: '-'
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: null,
        currentUser: initialUser
    },
    reducers: {
        loggedIn: (state, action) => {
            state.token = action.payload;
        },
        gotTokenData: (state, action) => {
            state.currentUser.userId = action.payload.userId;
            state.currentUser.firstName = action.payload.firstName;
            state.currentUser.lastName = action.payload.lastName;
            state.currentUser.username = action.payload.username;
            state.currentUser.role = action.payload.type;
            state.currentUser.email = action.payload.email;

            const content = action.payload.profilePic;

            if (content !== null && content !== undefined) {
                state.currentUser.pic = `data:image/png;base64,${content.fileContents}`;
            }
        },
        loggedOut: (state, action) => {
            state.token = null;
            state.currentUser = initialUser;
        },
        dataCleared: (state, action) => {
            state.currentUser = initialUser;
        },
        dataSet: (state, action) => {
            state.currentUser[action.payload.field] = action.payload.data;
        }
    }
})

const {
    loggedIn,
    gotTokenData,
    dataCleared,
    dataSet
} = loginSlice.actions;

export default loginSlice.reducer;

// Action Creators

const url = ENDPOINTS.login;

export const logIn = (data) => (dispatch, getState) => {
    const logUrl = url + '/Login';

    dispatch(
        apiCallBegan({
            url: logUrl,
            method: 'post',
            data: data,
            onSuccess: loggedIn.type,
        })
    ).then(() => dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    ));
};

export const getTokenData = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    );
}

export const logOut = () => (dispatch, getState) => {
    dispatch({type: 'login/loggedOut'});
}

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setLoginData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

// Selectors

// export const getLoggedStatus = state => state.login.logged;

export const getLoggedStatus = () => createSelector(
    state => state.login.logged === true
);
