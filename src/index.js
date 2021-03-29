// @ts-nocheck
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setLocale } from 'yup';
import 'bootstrap';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import '../assets/favicon.ico';

import gon from 'gon';

import initApp from './initApp.jsx';
import initRollbar from './rollbar.js';
import initSocket from './socket.js';
import getUserName from './getUserName.js';
import i18n from './i18n.js';

import yupLocale from './locales/yupLocale.js';
import reducer from './store/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: {
    ids: gon.channels.map(({ id }) => id),
    entities: gon.channels.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    currentChannelId: gon.currentChannelId,
  },
  messages: {
    ids: gon.messages.map(({ id }) => id),
    entities: gon.messages.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
  },
};

const store = configureStore({ preloadedState, reducer });

setLocale(yupLocale);
initSocket(store);

// const rollbar = initRollbar();
// const nickname = getUserName();

const loggerContextValue = { rollbar: initRollbar() };
const userContextValue = { nickname: getUserName() };

ReactDOM.render(
  initApp(store, loggerContextValue, userContextValue, i18n),
  document.getElementById('chat'),
);
