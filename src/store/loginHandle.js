import { createSlice } from "@reduxjs/toolkit";

// local imports
import { apiCallBegan, loggedOut, ENDPOINTS } from "./middleware/api";

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
        loggedOut: (state) => {
            state.token = null;
            state.currentUser = initialUser;
        },
        dataCleared: (state) => {
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

const url = ENDPOINTS.loginBase;

export const logIn = (data) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.login,
            method: 'post',
            data,
            onSuccess: loggedIn.type,
        })
    ).then(() => dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    ));
};

export const getTokenData = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url,
            onSuccess: gotTokenData.type,
        })
    );
}

export const logOut = () => (dispatch) => {
    dispatch(loggedOut());
}

export const clearData = () => (dispatch) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setLoginData = (field, data) => (dispatch) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

export const loadDashboardData = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.dashboard,
            onSuccess: dashboardDataLoaded.type,
        })
    );
}

export const authenticateUser = (data) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.authenticate,
            method: 'post',
            data,
            onSuccess: userAuthenticated.type,
        })
    );
};

export const updateProfile = (userId, data) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: ENDPOINTS.user + '/' + userId,
            method: 'put',
            data,
            onSuccess: gotTokenData.type,
        })
    );
};

// Selectors
