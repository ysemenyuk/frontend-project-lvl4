/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const chatAdapter = createEntityAdapter();
export const chatSelectors = chatAdapter.getSelectors();

const channels = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: null,
    сhannelIdForRemove: null,
  }),
  reducers: {
    initState: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
      chatAdapter.setAll(state, action.payload.channels);
    },
    selectChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: chatAdapter.addOne,
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      state.сhannelIdForRemove = action.payload;
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
    addMessage: chatAdapter.addOne,
  },
  extraReducers: {
    [channels.actions.initState]: (state, action) => {
      chatAdapter.setAll(state, action.payload.messages);
    },
    [channels.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = chatSelectors
        .selectAll(state)
        .filter((i) => i.channelId === action.payload)
        .map((i) => i.id);
      chatAdapter.removeMany(state, channelMessagesIds);
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
    openModalForAddChannel: (state) => {
      state.modalShow = true;
      state.modalTitle = 'adding';
    },
    openModalForRemoveChannel: (state, action) => {
      state.modalShow = true;
      state.modalTitle = 'removing';
      state.modalData = action.payload;
    },
    openModalForRenameChannel: (state, action) => {
      state.modalShow = true;
      state.modalTitle = 'renaming';
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.modalShow = false;
      state.modalTitle = null;
      state.modalData = null;
    },
  },
});

export const {
  selectChannel, initState, removeChannel, addChannel, renameChannel,
} = channels.actions;
export const { addMessage } = messages.actions;
export const {
  openModalForAddChannel, openModalForRemoveChannel, openModalForRenameChannel, closeModal,
} = modal.actions;

export default {
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
