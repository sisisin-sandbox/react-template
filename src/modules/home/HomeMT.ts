import { createAggregate } from 'redux-aggregate';
export interface HomeState {
  x: string | null;
}

const homeMT = {
  setX(state: HomeState, payload: string): HomeState {
    return { x: payload };
  },
};

export const homeAggregate = createAggregate(homeMT, 'home/');

export const homeReducer = homeAggregate.reducerFactory<HomeState>({ x: null });
