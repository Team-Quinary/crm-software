import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducer from './_entities';
import loginReducer from './loginHandle';

export default combineReducers({
    entities: entitiesReducer,
    login: loginReducer
});