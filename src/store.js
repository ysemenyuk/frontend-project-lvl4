/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: null,
  }),
  reducers: {
    channelAdded: channelsAdapter.addOne,
    channelUpdated: channelsAdapter.updateOne,
    channelsReceived(state, action) {
      channelsAdapter.setAll(state, action.payload);
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },
});

const messagesAdapter = createEntityAdapter();

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    messageAdded(state, action) {
      console.log('messagesAdapter.addOne', action.payload);
      messagesAdapter.addOne(state, action);
    },
    messagesReceived(state, action) {
      messagesAdapter.setAll(state, action.payload);
    },
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const { channelAdded, channelsReceived, setCurrentChannel } = channelsSlice.actions;
export const { messageAdded, messagesReceived } = messagesSlice.actions;

export default {
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
};
