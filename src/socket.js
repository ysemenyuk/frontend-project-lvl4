import { io } from 'socket.io-client';

import { channelsActions, messagesActions } from './store/index.js';

export default (store) => {
  const socket = io();

  socket.on('newMessage', (response) => {
    const message = response.data.attributes;
    store.dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (response) => {
    const channel = response.data.attributes;
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('renameChannel', (response) => {
    const channel = response.data.attributes;
    store.dispatch(channelsActions.renameChannel(channel));
  });

  socket.on('removeChannel', (response) => {
    const channelId = response.data.id;
    store.dispatch(channelsActions.removeChannel(channelId));
  });
};
