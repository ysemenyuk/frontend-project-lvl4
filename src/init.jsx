import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';
import Rollbar from 'rollbar';

import App from './components/App.jsx';
import AppContext from './appContext.js';

import reducer, {
  addChannel, removeChannel, renameChannel, addMessage, initState,
} from './store/index.js';

export default (gon) => {
  console.log('init gon', gon);

  const rollbar = new Rollbar({
    accessToken: '44328a6c1c724417815434212062b05d',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'development',
    },
  });

  const store = configureStore({
    reducer,
  });

  store.dispatch(initState(gon));

  const socket = io();

  socket.on('newMessage', (responce) => {
    // console.log('socet newMessage responce', responce);
    const message = responce.data.attributes;
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (responce) => {
    // console.log('socet newChannel responce', responce);
    const channel = responce.data.attributes;
    store.dispatch(addChannel(channel));
  });

  socket.on('renameChannel', (responce) => {
    // console.log('socet renameChannel responce', responce);
    const channel = responce.data.attributes;
    store.dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (responce) => {
    // console.log('socet removeChannel responce', responce);
    const channelId = responce.data.id;
    store.dispatch(removeChannel(channelId));
  });

  // eslint-disable-next-line functional/no-let
  let nickname = Cookies.get('nickname');
  console.log({ nickname });

  if (nickname === undefined) {
    nickname = faker.name.findName();
    Cookies.set('nickname', nickname);
  }
  console.log({ nickname });

  ReactDOM.render(
    <Provider store={store}>
      <AppContext.Provider value={{ nickname, rollbar }}>
        <App />
      </AppContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
