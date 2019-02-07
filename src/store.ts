import { combineReducers, createStore, Store, applyMiddleware, AnyAction } from 'redux';
import { homeReducer, homeEpics } from './modules/home/HomeMT';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

const epics = combineEpics(...Object.values(homeEpics));
const epicMiddleware = createEpicMiddleware({});
export const store = createStore(
  combineReducers({ home: homeReducer }),
  applyMiddleware(epicMiddleware),
);
epicMiddleware.run(epics as any);
export type AppState = typeof store extends Store<infer State> ? State : never;
