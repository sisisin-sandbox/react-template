import { createAggregate } from '@sisisin/redux-aggregate';
import { HomeResponse } from '../../entity/HomeResponse';
import { makeActionFilters } from '../../services/util';
import * as epics from './HomeEpics';

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

export const homeAggregate = createAggregate(homeMT, 'home/');
export const homeFilters = makeActionFilters(homeAggregate);
export const homeReducer = homeAggregate.reducerFactory<HomeState>({ x: null });
export const homeEpics = epics;
