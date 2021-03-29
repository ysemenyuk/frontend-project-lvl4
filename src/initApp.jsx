import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { UserContext, LoggerContext } from './context.js';
import App from './components/App.jsx';

const initApp = (store, loggerContextValue, userContextValue, i18n) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <LoggerContext.Provider value={loggerContextValue}>
        <UserContext.Provider value={userContextValue}>
          <App />
        </UserContext.Provider>
      </LoggerContext.Provider>
    </Provider>
  </I18nextProvider>
);

export default initApp;
