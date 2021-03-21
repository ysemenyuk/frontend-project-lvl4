import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App.jsx';
import AppContext from './context.js';
import initSocet from './socet.js';
import initCookies from './cookies.js';
import initI18n from './i18n.js';

import reducer, { initState } from './store/index.js';

export default (gon, rollbar) => {
  console.log('gon', gon);

  const store = configureStore({ reducer });
  store.dispatch(initState(gon));

  initI18n();
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
