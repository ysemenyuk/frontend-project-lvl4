import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import { UserContext, LoggerContext } from './context.js';

const initApp = (store, rollbar, nickname) => (
  <Provider store={store}>
    <LoggerContext.Provider value={{ rollbar }}>
      <UserContext.Provider value={{ nickname }}>
        <App />
      </UserContext.Provider>
    </LoggerContext.Provider>
  </Provider>
);

export default initApp;
