/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setCurrentChannel } = chatSlice.actions;

export default chatSlice.reducer;
