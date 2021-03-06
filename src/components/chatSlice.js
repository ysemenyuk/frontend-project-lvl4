/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
    channels: [],
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      console.log('addMessage', action.payload);
      state.messages.push(action.payload);
    },
    addChannel: (state, action) => {
      console.log('addChannel', action.payload);
      state.channels.push(action.payload);
    },
  },
});

export const { addMessage, addChannel } = chatSlice.actions;

export default chatSlice.reducer;
