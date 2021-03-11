/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
export const messagesAdapter = createEntityAdapter();

const channels = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    receiveChannels: channelsAdapter.setAll,
  },
});

const messages = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    receiveMessages: messagesAdapter.setAll,
  },
  extraReducers: {
    [channels.actions.removeChannel]: (state, action) => {
      console.log('messagesSlice extraReducers action.payload', action.payload);
    },
  },
});

const chat = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: {
    [channels.actions.removeChannel]: (state, action) => {
      console.log('chatSlice extraReducers action.payload', action.payload);
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    },
  },
});

const modal = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    modalTitle: null,
    modalData: null,
  },
  reducers: {
    openModal: (state, action) => {
      console.log('modalSlice action.payload', action.payload);
      state.modalShow = true;
      state.modalTitle = action.payload.modalTitle;
      state.modalData = action.payload.modalData;
    },
    closeModal: (state) => {
      state.modalShow = false;
      state.modalTitle = null;
      state.modalData = null;
    },
  },
});

export const { setCurrentChannel } = chat.actions;
export const { addChannel, renameChannel, removeChannel, receiveChannels } = channels.actions;
export const { addMessage, receiveMessages, removeChannelMessages } = messages.actions;
export const { openModal, closeModal } = modal.actions;

export default {
  chat: chat.reducer,
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
