import { createAggregate } from '@sisisin/redux-aggregate';
import { AnyAction } from 'redux';
import { AppState } from '../../App';
import { Epic, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { httpClient } from '../../services/HttpClient';
import { HomeResponse } from '../../entity/HomeResponse';

export interface HomeState {
  x: string | null;
}

const homeMT = {
  setX(state: HomeState, payload: string): HomeState {
    return { x: payload };
  },
  init(state: HomeState): HomeState {
    return state;
  },
  initFullfilled(state: HomeState, res: HomeResponse): HomeState {
    return { x: res.home };
  },
};

export const homeEpics: {
  fetchHome: Epic<AnyAction, AnyAction, AppState, {}>;
} = {
  fetchHome: (action$, state$, dependencies) =>
    action$.pipe(
      ofType(homeAggregate.types.init),
      mergeMap(() => httpClient.get<HomeResponse>('/home', { home: 'home!' })),
      map(res => homeAggregate.creators.initFullfilled(res.body)),
    ),
};

export const homeAggregate = createAggregate(homeMT, 'home/');

export const homeReducer = homeAggregate.reducerFactory<HomeState>({ x: null });
