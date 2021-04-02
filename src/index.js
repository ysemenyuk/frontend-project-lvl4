// @ts-nocheck
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setLocale } from 'yup';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import faker from 'faker';
import Cookies from 'js-cookie';
import 'bootstrap';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import '../assets/favicon.ico';

import gon from 'gon';

import initApp from './initApp.jsx';
import initRollbar from './rollbar.js';
import initSocket from './socket.js';
import i18n from './i18n.js';

import yupLocale from './locales/yupLocale.js';
import reducer from './store/slices.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

setLocale(yupLocale);

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
initSocket(store);

const rollbar = initRollbar();

const nickname = Cookies.get('nickname') || faker.name.findName();
Cookies.set('nickname', nickname, { expires: 7 });

const loggerContextValue = { rollbar };
const userContextValue = { nickname };

ReactDOM.render(
  initApp(store, loggerContextValue, userContextValue, i18n),
  document.getElementById('chat'),
);
