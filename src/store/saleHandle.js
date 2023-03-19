import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

const initialVars = {
    newCompany: '',
    enduserId: '',
    enduser: null,
    projectId: '',
    project: null,
    soldDate: '',
    category: 'enduser',
    sortField: 'enduser',
    descending: 1,
    open: false,
};

export const saleSlice = createSlice({
    name: 'sales',
    initialState: {
        endUsersList: [],
        salesList: [],
        loading: false,
        variables: initialVars,
        sortFields: [
            {
                value: 'enduser',
                text: 'Enduser'
            },
            {
                value: 'project',
                text: 'Project'
            },
            {
                value: 'date',
                text: 'Date'
            }
        ],
        searchParams: [
            {
                value: 'enduser',
                text: 'Enduser'
            },
            {
                value: 'project',
                text: 'Project'
            }
        ]
    },
    reducers: {
        salesRequested: (state) => {
            state.loading = true;
        },
        salesRequestFailed: (state) => {
            state.loading = false;
        },
        salesReceived: (state, action) => {
            state.salesList = action.payload;

            state.loading = false;
        },
        endusersReceived: (state, action) => {
            state.endUsersList = action.payload;
        },
        saleAdded: (state, action) => {
            state.salesList.push(action.payload);
        },
        saleUpdated: (state, action) => {
            const index = state.salesList.findIndex(sale => sale.saleId === action.payload.saleId);
            if (index >= 0) state.salesList[index] = action.payload;
        },
        saleRemoved: (state, action) => {
            const index = state.salesList.findIndex(sale => sale.saleId === action.payload.saleId);
            if (index >= 0) state.salesList.splice(index, 1);
        },
        enduserAdded: (state, action) => {
            state.endUsersList.push(action.payload);
        },
        enduserUpdated: (state, action) => {
            const index = state.endUsersList.findIndex(endUser => endUser.enduserId === action.payload.enduserId);
            if (index >= 0) state.endUsersList[index] = action.payload;
        },
        enduserRemoved: (state, action) => {
            const index = state.endUsersList.findIndex(endUser => endUser.enduserId === action.payload.enduserId);
            if (index >= 0) state.endUsersList.splice(index, 1);
        },
        dataCleared: (state, action) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        },
        salesSorted: (state, action) => {
            const sortList = (s1, s2) => {
                switch(state.variables.sortField) {
                    case 'enduser':
                        console.log(s1.enduser.company);
                        return (
                            (s1.enduser.company < s2.enduser.company)
                                ? -state.variables.descending
                                : (s1.enduser.company > s2.enduser.company) ? state.variables.descending : 0
                        );
                    case 'project':
                        return (
                            (s1.project.name < s2.project.name)
                                ? -state.variables.descending
                                : (s1.project.name > s2.project.name) ? state.variables.descending : 0
                        );
                    case 'date':
                        return (
                            (s1.soldDate < s2.soldDate)
                                ? -state.variables.descending
                                : (s1.soldDate > s2.soldDate) ? state.variables.descending : 0
                        );
                    default:
                        break;
                }
            }

            state.salesList = state.salesList.sort(sortList);
        }
    }
})

const {
    salesRequested,
    salesRequestFailed,
    salesReceived,
    saleAdded,
    saleUpdated,
    saleRemoved,
    endusersReceived,
    enduserAdded,
    enduserUpdated,
    enduserRemoved,
    dataCleared,
    dataSet,
    salesSorted
} = saleSlice.actions;

export default saleSlice.reducer;

// Action Creators

const url = ENDPOINTS.endUser;
const saleUrl = url + '/Sale';

export const loadSales = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: saleUrl,
            onStart: salesRequested.type,
            onSuccess: salesReceived.type,
            onError: salesRequestFailed.type
        })
    );
};

export const addSale = (sale) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: saleUrl,
            method: 'post',
            data: sale,
            onSuccess: saleAdded.type,
        })
    ).then(() => dispatch({
        type: salesSorted.type
    }));
};

export const updateSale = (saleId, sale) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: saleUrl + '/' + saleId,
            method: 'put',
            data: sale,
            onSuccess: saleUpdated.type,
        })
    ).then(() => dispatch({
        type: salesSorted.type
    }));
};

export const removeSale = (saleId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: saleUrl + '/' + saleId,
            method: 'delete',
            data: saleId,
            onSuccess: saleRemoved.type,
        })
    );
};

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setSalesData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

export const sortSales = () => (dispatch, getState) => {
    dispatch({
        type: salesSorted.type
    });
}

export const loadEndusers = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onSuccess: endusersReceived.type
        })
    );
};

export const addEnduser = (enduser) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: enduser,
            onSuccess: enduserAdded.type,
        })
    );
};

export const updateEnduser = (enduserId, enduser) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + enduserId,
            method: 'put',
            data: enduser,
            onSuccess: enduserUpdated.type,
        })
    );
};

export const removeEnduser = (enduserId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + enduserId,
            method: 'delete',
            data: enduserId,
            onSuccess: enduserRemoved.type,
        })
    );
};

// Selectors

export const getSale = saleId => createSelector(
    state => state.entities.sales.salesList,
    sales => sales.find(sale => sale.saleId === saleId)
);

export const getEndUser = enduserId => createSelector(
    state => state.entities.sales.endUsersList,
    endusers => endusers.find(endUser => endUser.enduserId === enduserId)
);

export const getEnduserProjects = enduserId => createSelector(
    state => state.entities.sales.salesList,
    sales => sales.find(sale => sale.enduserId === enduserId)
)
