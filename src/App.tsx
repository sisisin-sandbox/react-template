import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HomeContainer } from './modules/home/HomeContainer';
import { store } from './store';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeContainer />;
      </Provider>
    );
  }
}
