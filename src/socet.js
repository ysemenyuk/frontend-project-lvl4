import { io } from 'socket.io-client';

import {
  addChannel, removeChannel, renameChannel, addMessage,
} from './store/index.js';

export default (store) => {
  const socket = io();

  socket.on('newMessage', (responce) => {
    const message = responce.data.attributes;
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (responce) => {
    const channel = responce.data.attributes;
    store.dispatch(addChannel(channel));
  });

  socket.on('renameChannel', (responce) => {
    const channel = responce.data.attributes;
    store.dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (responce) => {
    const channelId = responce.data.id;
    store.dispatch(removeChannel(channelId));
  });
};
