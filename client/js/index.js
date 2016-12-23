import styles from '../scss/styles.scss'; // eslint-disable-line no-unused-vars

import {combineReducers, createStore} from 'redux';
import {initialState} from './actions';
import Match from './components/match';
import NES from 'nes/client';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components';
import * as reducers from './reducers';

let store;



/* establish a new websocket connection with the server */
const client = new NES.Client('ws://localhost:3000');



function renderInit() {
  const state = store.getState();

  ReactDOM.render((
    <Provider store={store}>
        <App>
            <Match />
        </App>
    </Provider>
  ), document.getElementById('inject'));
}


client.connect((err) => {
  if (err) {
    throw new Error(err);
  }
  client.request('/word', (error, payload) => {
    if (error) {
      throw new Error(error);
    }

    store = createStore(combineReducers(reducers));
    store.subscribe(renderInit);
    store.dispatch(initialState(payload));
    console.log(payload);
  });
});
