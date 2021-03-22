import { io } from 'socket.io-client';

import {
  addChannel, removeChannel, renameChannel, addMessage,
} from './store/index.js';

export default (store) => {
  const socket = io();

  socket.on('newMessage', (response) => {
    const message = response.data.attributes;
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (response) => {
    const channel = response.data.attributes;
    store.dispatch(addChannel(channel));
  });

  socket.on('renameChannel', (response) => {
    const channel = response.data.attributes;
    store.dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (response) => {
    const channelId = response.data.id;
    store.dispatch(removeChannel(channelId));
  });
};
