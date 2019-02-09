import { ReactStateDeclaration, UIRouterReact } from '@uirouter/react';
import { AnyAction, Store } from 'redux';
import { AppState } from './App';
import { HomeContainer } from './modules/home/HomeContainer';

export function createRouterStates(store: Store<AppState, AnyAction>): ReactStateDeclaration[] {
  return [
    {
      name: 'home',
      url: '/home',
      component: HomeContainer,
      data: { requiresAuth: true },
    },
  ];
}

export function setupRouter(store: Store<AppState, AnyAction>, router: UIRouterReact) {
  router.urlRouter.otherwise('/404');

  router.transitionService.onBefore(
    {
      to(state) {
        return state && state.data && state.data.requiresAuth;
      },
    },
    async transition => {
      const isAuthed = true;
      if (isAuthed) {
        return;
      } else {
        return transition.router.stateService.target('login');
      }
    },
  );
}
