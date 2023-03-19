import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./middleware/api";
import { ENDPOINTS } from "./middleware/api";

export const statusTypes = ['Ongoing', 'Completed', 'Suspended'];

const initialVars = {
    name: '',
    fee: '',
    duration: '',
    description: '',
    techLeadId: '',
    techLead: null,
    customerId: '',
    customer: null,
    startDate: '',
    status: statusTypes[0],
    installments: '',
    category: 'name',
    sortField: 'name',
    descending: 1,
    open: false
};

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        list: [],
        loading: false,
        variables: initialVars,
        sortFields: [
            {
                value: 'name',
                text: 'Project'
            },
            {
                value: 'company',
                text: 'Company'
            },
            {
                value: 'contactPerson',
                text: 'Contact Person'
            },
            {
                value: 'techLead',
                text: 'Tech Lead'
            }
        ],
        searchParams: [
            {
                value: 'name',
                text: 'by Project'
            },
            {
                value: 'company',
                text: 'by Company'
            },
            {
                value: 'contactPerson',
                text: 'by Contact Person'
            },
            {
                value: 'status',
                text: 'by Status'
            },
            {
                value: 'techLead',
                text: 'by Tech Lead'
            }
        ]
    },
    reducers: {
        projectsRequested: (state) => {
            state.loading = true;
        },
        projectsRequestFailed: (state) => {
            state.loading = false;
        },
        projectsReceived: (state, action) => {
            state.list = action.payload.sort((p1, p2) =>
                (p1.name < p2.name)
                    ? -1
                    : (p1.name > p2.name) ? 1 : 0
            );

            state.loading = false;
        },
        projectAdded: (state, action) => {
            state.list.push(action.payload);
        },
        projectUpdated: (state, action) => {
            const index = state.list.findIndex(project => project.projectId === action.payload.projectId);
            if (index >= 0) state.list[index] = action.payload;
        },
        projectRemoved: (state, action) => {
            const index = state.list.findIndex(project => project.projectId === action.payload.projectId);
            if (index >= 0) state.list.splice(index, 1);
        },
        dataCleared: (state, action) => {
            state.variables = initialVars;
        },
        dataSet: (state, action) => {
            state.variables[action.payload.field] = action.payload.data;
        }
    }
})

const {
    projectsRequested,
    projectsRequestFailed,
    projectsReceived,
    projectAdded,
    projectUpdated,
    projectRemoved,
    dataCleared,
    dataSet,
} = projectSlice.actions;

export default projectSlice.reducer;

// Action Creators

const url = ENDPOINTS.project;

export const loadProjects = () => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: projectsRequested.type,
            onSuccess: projectsReceived.type,
            onError: projectsRequestFailed.type
        })
    );
};

export const addProject = (project) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            method: 'post',
            data: project,
            onSuccess: projectAdded.type,
        })
    )
    // .then(() => dispatch({
    //     type: usersSorted.type
    // }));
};

export const updateProject = (projectId, project) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + projectId,
            method: 'put',
            data: project,
            onSuccess: projectUpdated.type,
        })
    )
    // .then(() => dispatch({
    //     type: usersSorted.type
    // }));
};

export const removeProject = (projectId) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: url + '/' + projectId,
            method: 'delete',
            data: projectId,
            onSuccess: projectRemoved.type,
        })
    );
};

export const clearData = () => (dispatch, getState) => {
    dispatch({
        type: dataCleared.type
    });
}

export const setProjectData = (field, data) => (dispatch, getState) => {
    dispatch({
        type: dataSet.type,
        payload: { field, data }
    });
}

export const sortProjects = () => (dispatch, getState) => {
    // dispatch({
    //     type: usersSorted.type
    // });
}

// Selectors

export const getProject = projectId => createSelector(
    state => state.entities.projects.list,
    projects => projects.find(project => project.projectId === projectId)
);
