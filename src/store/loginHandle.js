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
    pic: '-',
    verified: false,
};

const initialDashboardData = {
    projectCount: 0,
    customerCount: 0,
    techLeadCount: 0,
    completed: 0,
    ongoing: 0,
    suspended: 0,
    lastDays: [],
    newProjects: [],
    payments: []    
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: null,
        currentUser: initialUser,
        dashboardData: initialDashboardData
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
            state.dashboardData = initialDashboardData;
        },
        dataSet: (state, action) => {
            state.currentUser[action.payload.field] = action.payload.data;
        },
        dashboardDataLoaded: (state, action) => {
            state.dashboardData = action.payload;
        },
        userAuthenticated: (state, action) => {
            state.currentUser.verified = action.payload;
        },
    }
})

const {
    loggedIn,
    gotTokenData,
    dataCleared,
    dataSet,
    dashboardDataLoaded,
    userAuthenticated
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

export const loadDashboardData = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.dashboard,
            onSuccess: dashboardDataLoaded.type,
        })
    );
}

export const authenticateUser = (data) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.login + '/Authenticate',
            method: 'post',
            data: data,
            onSuccess: userAuthenticated.type,
        })
    );
};

export const updateProfile = (userId, data) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.user + '/' + userId,
            method: 'put',
            data: data,
            onSuccess: gotTokenData.type,
        })
    );
};

// Selectors

// export const getLoggedStatus = state => state.login.logged;

export const getLoggedStatus = () => createSelector(
    state => state.login.logged === true
);
