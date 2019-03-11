import { combineReducers } from 'redux';
import { formReducer } from './modules/form/FormMT';
import { homeReducer } from './modules/home/HomeMT';

export const reducer = combineReducers({ home: homeReducer, form: formReducer });
