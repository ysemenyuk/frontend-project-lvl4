/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
export const messagesAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

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

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
    receiveMessages: messagesAdapter.setAll,
  },
});

const modalSlice = createSlice({
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

export const { setCurrentChannel } = chatSlice.actions;
export const { addChannel, renameChannel, removeChannel, receiveChannels } = channelsSlice.actions;
export const { addMessage, receiveMessages } = messagesSlice.actions;
export const { openModal, closeModal } = modalSlice.actions;

export default {
  chat: chatSlice.reducer,
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
  modal: modalSlice.reducer,
};
