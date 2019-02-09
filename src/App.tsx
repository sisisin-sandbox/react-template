import { UIRouter, UIRouterProps, UIRouterReact, UIView } from '@uirouter/react';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { setupRouter } from './router.config';
import { createAppStore } from './store';

const router = new UIRouterReact();
const store = createAppStore({ router });
export type AppState = typeof store extends Store<infer State> ? State : never;
setupRouter(store, router);

const uiRouterProps: UIRouterProps = {
  router,
};

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIRouter {...uiRouterProps}>
          <UIView />
        </UIRouter>
      </Provider>
    );
  }
}
