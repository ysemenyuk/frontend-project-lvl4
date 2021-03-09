/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    receiveMessages: messagesAdapter.setAll,
  },
});

export const { addMessage, receiveMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
