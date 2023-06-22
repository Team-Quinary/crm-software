import { configureStore } from "@reduxjs/toolkit";

// local imports
import reducer from './_reducer';
import api from './middleware/api';

const sessionStorage = window.sessionStorage;

const saveStateToSessionStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.log(error);
    }
};

const loadStateFromSessionStorage = () => {
    try {
        const serializedState = sessionStorage.getItem('reduxState');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);

        return undefined;
    }
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api), 
    preloadedState: loadStateFromSessionStorage()
})

store.subscribe(() => {
    saveStateToSessionStorage(store.getState());
});

export default store;