/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    channelAdded: (state, action) => {
      console.log('addChannel channelsSlice', action.payload);
      state.channels.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      console.log('setCurrentChannel channelsSlice', action.payload);
      state.currentChannelId = action.payload;
    },
    renameChannel: (state, action) => {
      console.log('renameChannel channelsSlice', action.payload);
    },
    removeChannel: (state, action) => {
      console.log('removeChannel channelsSlice', action.payload);
    },
  },
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    messageAdded: (state, action) => {
      console.log('addMessage messagesSlice', action.payload);
      state.messages.push(action.payload);
    },
  },
});

export const { channelAdded, setCurrentChannel } = channelsSlice.actions;
export const { messageAdded } = messagesSlice.actions;

export default {
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
};
