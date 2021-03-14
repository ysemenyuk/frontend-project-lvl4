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

import reducer, {
  setCurrentChannel, addChannel, removeChannel, receiveChannels, addMessage, receiveMessages,
} from './store/index.js';

export const AppContext = React.createContext();

export default (gon) => {
  console.log('init gon', gon);
  const { messages, channels, currentChannelId } = gon;

  const store = configureStore({
    reducer,
  });

  store.dispatch(receiveChannels(channels));
  store.dispatch(receiveMessages(messages));
  store.dispatch(setCurrentChannel(currentChannelId));

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

  socket.on('removeChannel', (responce) => {
    console.log('socet removeChannel responce', responce);
    const channelId = responce.data.id;
    store.dispatch(removeChannel(channelId));
    // const ids = ??
    // store.dispatch(removeChannelMessages(ids));
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
