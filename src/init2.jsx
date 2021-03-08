/* eslint-disable object-curly-newline */
/* eslint-disable functional/no-let */
/* eslint-disable import/no-cycle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import faker from 'faker';
import Cookies from 'js-cookie';

import App from './components/App.jsx';
import reducer, { channelAdded, messageAdded } from './store.js';

export const AppContext = React.createContext();

export default (gon) => {
  console.log('init gon', gon);
  const { messages, channels, currentChannelId } = gon;

  const store = configureStore({
    reducer,
    preloadedState: {
      channels: { channels, currentChannelId },
      messages: { messages },
    },
  });

  console.log('init store.getState()', store.getState());

  const socket = io();

  socket.on('newMessage', (responce) => {
    console.log('socet newMessage responce', responce);
    const message = responce.data.attributes;
    store.dispatch(messageAdded(message));
  });

  socket.on('newChannel', (responce) => {
    console.log('socet newChannel responce', responce);
    const channel = responce.data.attributes;
    store.dispatch(channelAdded(channel));
  });

  let nickname = Cookies.get('nickname');

  if (nickname === undefined) {
    nickname = faker.name.findName();
    Cookies.set('nickname', nickname);
  }

  ReactDOM.render(
    <Provider store={store}>
      <AppContext.Provider value={nickname}>
        <App />
      </AppContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
