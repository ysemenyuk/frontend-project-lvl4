// @ts-nocheck

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/dist/modal.js';
import 'bootstrap';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon);
