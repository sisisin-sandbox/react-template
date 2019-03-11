import { UIRouterReact } from '@uirouter/react';
import { applyMiddleware, createStore, Unsubscribe } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { homeEpics } from './modules/home/HomeMT';
import { reducer } from './reducer';

export interface EpicDependencies {
  router: UIRouterReact;
}

let previousState: any = {};
let subs: Unsubscribe | null = null;

export function createAppStore(dependencies: EpicDependencies) {
  const epics = combineEpics(...Object.values(homeEpics));
  const epicMiddleware = createEpicMiddleware({ dependencies });

  if (subs) {
    subs();
  }
  const store = createStore(reducer, previousState, applyMiddleware(epicMiddleware));

  epicMiddleware.run(epics as any);

  if ((module as any).hot) {
    subs = store.subscribe(() => {
      previousState = store.getState();
    });

    (module as any).hot.accept('./reducer', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
}
