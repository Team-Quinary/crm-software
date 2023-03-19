import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

export const userTypes = ['Admin', 'Tech Lead'];

const initialVars = {
    type: userTypes[1],
    firstName: '',
    lastName: '',
    contactNo: '',
    email: '',
    username: '',
    password: '',
    category: 'name',
    sortField: 'all',
    descending: 1,
    open: false
};

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        variables: initialVars,
        sortFields: [
            {
                value: 'techLead',
                text: 'Tech Lead'
            },
            {
                value: 'admin',
                text: 'Admin'
            },
            {
                value: 'all',
                text: 'All'
            }
        ],
        searchParams: [
            {
                value: 'name',
                text: 'by Name'
            },
            {
                value: 'contactNo',
                text: 'by Contact No'
            },
            {
                value: 'email',
                text: 'by Email'
            }
        ]
    },
    reducers: {
        usersRequested: (state) => {
            state.loading = true;
        },
        usersRequestFailed: (state) => {
            state.loading = false;
        },
        usersReceived: (state, action) => {
            state.list = action.payload.sort((u1, u2) =>
                (u1.firstName + ' ' + u1.lastName < u2.firstName + ' ' + u2.lastName)
                    ? -1
                    : (u1.firstName + ' ' + u1.lastName > u2.firstName + ' ' + u2.lastName) ? 1 : 0
            );

            state.loading = false;
        },
        userAdded: (state, action) => {
            state.list.push(action.payload);
        },
        userUpdated: (state, action) => {
            const index = state.list.findIndex(user => user.userId === action.payload.userId);
            if (index >= 0) state.list[index] = action.payload;
        },
        userRemoved: (state, action) => {
            const index = state.list.findIndex(user => user.userId === action.payload.userId);
            if (index >= 0) state.list.splice(index, 1);
        },
        dataCleared: (state, action) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        },
        usersSorted: (state, action) => {
            const sortList = (u1, u2) => {
                var name1 = u1.firstName + " " + u1.lastName;
                var name2 = u2.firstName + " " + u2.lastName;

                return (
                    (name1 < name2)
                        ? -state.variables.descending
                        : (name1 > name2) ? state.variables.descending : 0
                );
            }

            state.list = state.list.sort(sortList);
        }
    }
})

const {
    usersRequested,
    usersRequestFailed,
    usersReceived,
    userAdded,
    userUpdated,
    userRemoved,
    dataCleared,
    dataSet,
    usersSorted,
} = userSlice.actions;

export default userSlice.reducer;

// Action Creators

const url = ENDPOINTS.user;

export const loadUsers = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: usersRequested.type,
            onSuccess: usersReceived.type,
            onError: usersRequestFailed.type
        })
    );
};

export const addUser = (user) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: user,
            onSuccess: userAdded.type,
        })
    ).then(() => dispatch({
        type: usersSorted.type
    }));
};

export const updateUser = (userId, user) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'put',
            data: user,
            onSuccess: userUpdated.type,
        })
    ).then(() => dispatch({
        type: usersSorted.type
    }));
};

export const removeUser = (userId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'delete',
            data: userId,
            onSuccess: userRemoved.type,
        })
    );
};

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setUserData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

export const sortUsers = () => (dispatch, getState) => {
    dispatch({
        type: usersSorted.type
    });
}

// Selectors

export const getUser = userId => createSelector(
    state => state.entities.users.list,
    users => users.find(user => user.userId === userId)
);

export const getAdmins = () => createSelector(
    state => state.entities.users.list,
    users => users.filter(user => user.type === 'Admin')
);

export const getTechLeads = () => createSelector(
    state => state.entities.users.list,
    users => users.filter(user => user.type === 'Tech Lead')
);

export const getCustomers = () => createSelector(
    state => state.entities.users.list,
    users => users.filter(user => user.type === 'Customer')
);
