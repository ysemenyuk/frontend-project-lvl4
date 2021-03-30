// @ts-nocheck
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setLocale } from 'yup';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import 'bootstrap';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import '../assets/favicon.ico';

import gon from 'gon';

import initApp from './initApp.jsx';
import initRollbar from './rollbar.js';
import initSocket from './socket.js';
import setUserName from './setUserName.js';
import i18n from './i18n.js';

import yupLocale from './locales/yupLocale.js';
import reducer from './store/slices.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: {
    ids: map(gon.channels, 'id'),
    entities: keyBy(gon.channels, 'id'),
    currentChannelId: gon.currentChannelId,
  },
  messages: {
    ids: map(gon.messages, 'id'),
    entities: keyBy(gon.messages, 'id'),
  },
};

const store = configureStore({ preloadedState, reducer });

setLocale(yupLocale);
initSocket(store);

const loggerContextValue = { rollbar: initRollbar() };
const userContextValue = { nickname: setUserName() };

ReactDOM.render(
  initApp(store, loggerContextValue, userContextValue, i18n),
  document.getElementById('chat'),
);
