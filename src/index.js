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

import initRollbar from './rollbar.js';
import initApp from './initApp.jsx';
import initSocket from './socket.js';
import initCookies from './cookies.js';
import initI18n from './i18n.js';

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
initI18n();

const rollbar = initRollbar();
const { nickname } = initCookies();

ReactDOM.render(
  initApp(store, rollbar, nickname),
  document.getElementById('chat'),
);
