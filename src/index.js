// @ts-nocheck

import 'bootstrap';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';

import initRollbar from './rollbar.js';
import initApp from './initApp.jsx';

const rollbar = initRollbar();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

initApp(gon, rollbar);
