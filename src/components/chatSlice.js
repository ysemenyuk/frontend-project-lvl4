/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
    channels: [],
    messages: [],
    inputValue: '',
  },
  reducers: {
    changeInput: (state, action) => {
      // console.log('changeInput', action.payload);
      state.inputValue = action.payload;
    },
    addMessage: (state, action) => {
      // console.log('addMessage', action.payload);
      const message = { id: action.payload, nickname: 'nickname', text: action.payload };
      state.messages.push(message);
      state.inputValue = '';
    },
  },
});

export const { changeInput, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
