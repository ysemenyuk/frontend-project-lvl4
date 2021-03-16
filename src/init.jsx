import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App.jsx';
import AppContext from './appContext.js';
import initSocet from './initSocet.js';
import initCookies from './initCookies.js';
import initRollbar from './initRollbar.js';

import reducer, { initState } from './store/index.js';

export default (gon) => {
  console.log('gon', gon);

  const rollbar = initRollbar();

  const store = configureStore({ reducer });

  store.dispatch(initState(gon));

  initSocet(store);

  const { nickname } = initCookies();

  ReactDOM.render(
    <Provider store={store}>
      <AppContext.Provider value={{ nickname, rollbar }}>
        <App />
      </AppContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
