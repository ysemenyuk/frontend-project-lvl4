/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    receiveChannels: channelsAdapter.setAll,
  },
});

export const { addChannel, renameChannel, removeChannel, receiveChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
