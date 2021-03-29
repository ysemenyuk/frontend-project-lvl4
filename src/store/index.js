/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const chatAdapter = createEntityAdapter();

export const channelsSelectors = chatAdapter.getSelectors((state) => state.channels);
export const messagesSelectors = chatAdapter.getSelectors((state) => state.messages);

const channels = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: null,
  }),
  reducers: {
    selectChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: chatAdapter.addOne,
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      chatAdapter.removeOne(state, action);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      chatAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

const messages = createSlice({
  name: 'messages',
  initialState: chatAdapter.getInitialState(),
  reducers: {
    addMessage: (state, action) => {
      chatAdapter.addOne(state, action);
    },
  },
  extraReducers: {
    [channels.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = state.ids
        .filter((id) => state.entities[id].channelId === action.payload);
      chatAdapter.removeMany(state, channelMessagesIds);
    },
  },
});

const modal = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    modalType: null,
    modalData: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalShow = true;
      state.modalType = action.payload.modalType;
      state.modalData = action.payload.modalData;
    },
    closeModal: (state) => {
      state.modalShow = false;
      state.modalTitle = null;
      state.modalData = null;
    },
  },
});

export const channelsActions = channels.actions;
export const messagesActions = messages.actions;
export const modalActions = modal.actions;

export default {
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
