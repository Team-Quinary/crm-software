import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

const initialVars = {
    company: '',
    contactPerson: '',
    contactNo: '',
    email: '',
    username: '',
    password: '',
    category: 'company',
    sortField: 'company',
    descending: 1,
    open: false
};

export const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        list: [],
        loading: false,
        variables: initialVars,
        sortFields: [
            {
                value: 'company',
                text: 'Company'
            },
            {
                value: 'contactPerson',
                text: 'Contact Person'
            }
        ],
        searchParams: [
            {
                value: 'company',
                text: 'by Company'
            },
            {
                value: 'contactPerson',
                text: 'by Contact Person'
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
        customersRequested: (state) => {
            state.loading = true;
        },
        customersRequestFailed: (state) => {
            state.loading = false;
        },
        customersReceived: (state, action) => {
            state.list = action.payload.sort((c1, c2) =>
                (c1.company < c2.company)
                    ? -1
                    : (c1.company > c2.company) ? 1 : 0
            );

            state.loading = false;
        },
        customerAdded: (state, action) => {
            state.list.push(action.payload);
        },
        customerUpdated: (state, action) => {
            const index = state.list.findIndex(customer => customer.userId === action.payload.userId);
            if (index >= 0) state.list[index] = action.payload;
        },
        customerRemoved: (state, action) => {
            const index = state.list.findIndex(customer => customer.userId === action.payload.userId);
            if (index >= 0) state.list.splice(index, 1);
        },
        dataCleared: (state, action) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        },
        customersSorted: (state, action) => {
            const sortList = (c1, c2) => {
                var name1 = c1.firstName + " " + c1.lastName;
                var name2 = c2.firstName + " " + c2.lastName;

                return (
                    (state.variables.sortField === 'contactPerson')
                        ? (name1 < name2)
                            ? -state.variables.descending
                            : (name1 > name2) ? state.variables.descending : 0
                        : (c1[state.variables.sortField] < c2[state.variables.sortField])
                            ? -state.variables.descending
                            : (c1[state.variables.sortField] > c2[state.variables.sortField]) ? state.variables.descending : 0
                );
            }

            state.list = state.list.sort(sortList);
        }
    }
})

const {
    customersRequested,
    customersRequestFailed,
    customersReceived,
    customerAdded,
    customerUpdated,
    customerRemoved,
    dataCleared,
    dataSet,
    customersSorted,
} = customerSlice.actions;

export default customerSlice.reducer;

// Action Creators

const url = ENDPOINTS.customer;

export const loadCustomers = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: customersRequested.type,
            onSuccess: customersReceived.type,
            onError: customersRequestFailed.type
        })
    );
};

export const addCustomer = (customer) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: customer,
            onSuccess: customerAdded.type,
        })
    ).then(() => dispatch({
        type: customersSorted.type
    }));
};

export const updateCustomer = (userId, customer) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'put',
            data: customer,
            onSuccess: customerUpdated.type,
        })
    ).then(() => dispatch({
        type: customersSorted.type
    }));
};

export const removeCustomer = (userId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + userId,
            method: 'delete',
            data: userId,
            onSuccess: customerRemoved.type,
        })
    );
};

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setCustomerData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

export const sortCustomers = () => (dispatch, getState) => {
    dispatch({
        type: customersSorted.type
    });
}

// Selectors

export const getCustomer = userId => createSelector(
    state => state.entities.customers.list,
    customers => customers.find(customer => customer.userId === userId)
);
