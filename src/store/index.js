/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
export const messagesAdapter = createEntityAdapter();

const channels = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: null,
  }),
  reducers: {
    initState: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
      channelsAdapter.setAll(state, action.payload.channels);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, action);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      channelsAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

const messages = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: {
    [channels.actions.initState]: (state, action) => {
      messagesAdapter.setAll(state, action.payload.messages);
    },
    [channels.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = Object.values(state.entities)
        .reduce((acc, item) => (item.channelId === action.payload ? [...acc, item.id] : acc), []);
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

export const {
  setCurrentChannel, initState, removeChannel, addChannel, renameChannel,
} = channels.actions;
export const { addMessage } = messages.actions;
export const { openModal, closeModal } = modal.actions;

export default {
  channels: channels.reducer,
  messages: messages.reducer,
  modal: modal.reducer,
};
