import { combineReducers, createStore, Store } from 'redux';
import { homeReducer } from './modules/home/HomeMT';

export const store = createStore(combineReducers({ home: homeReducer }));
export type AppState = typeof store extends Store<infer State> ? State : never;
