/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import _ from 'lodash';

export const channelsAdapter = createEntityAdapter();
export const messagesAdapter = createEntityAdapter();

const chat = createSlice({
  name: 'chat',
  initialState: {
    currentChannelId: null,
  },
  reducers: {
    initState: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    },
  },
});

const channels = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      channelsAdapter.updateOne(state, { id, changes: { name } });
    },
  },
  extraReducers: {
    [chat.actions.initState]: (state, action) => {
      channelsAdapter.setAll(state, action.payload.channels);
    },
    [chat.actions.removeChannel]: channelsAdapter.removeOne,
  },
});

const messages = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: {
    [chat.actions.initState]: (state, action) => {
      messagesAdapter.setAll(state, action.payload.messages);
    },
    [chat.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = _.reduce(
        state.entities,
        (acc, item, id) => (item.channelId === action.payload ? [...acc, id] : acc), [],
      );
      messagesAdapter.removeMany(state, channelMessagesIds);
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

export const { setCurrentChannel, initState, removeChannel } = chat.actions;
export const { addChannel, renameChannel } = channels.actions;
export const { addMessage } = messages.actions;
export const { openModal, closeModal } = modal.actions;

export default {
  chat: chat.reducer,
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
