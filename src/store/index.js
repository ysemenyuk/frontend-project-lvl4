/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const chatAdapter = createEntityAdapter();
export const chatSelectors = chatAdapter.getSelectors();

const channels = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: null,
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
  initialState: chatAdapter.getInitialState({ loading: [] }),
  reducers: {
    addMessage: (state, action) => {
      chatAdapter.addOne(state, action);
    },
  },
  extraReducers: {
    [channels.actions.initState]: (state, action) => {
      chatAdapter.setAll(state, action.payload.messages);
    },
    [channels.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = chatSelectors
        .selectAll(state)
        .filter((m) => m.channelId === action.payload)
        .map((m) => m.id);
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

export const {
  selectChannel, initState, removeChannel, addChannel, renameChannel,
} = channels.actions;
export const { addMessage } = messages.actions;
export const { openModal, closeModal } = modal.actions;

export default {
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
