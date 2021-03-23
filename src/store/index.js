/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const messagesAdapter = createEntityAdapter();

export const channelSelector = channelsAdapter.getSelectors();
export const messagesSelectors = messagesAdapter.getSelectors();

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
    selectChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      state.сhannelIdForRemove = action.payload;
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
  initialState: messagesAdapter.getInitialState({ loading: [] }),
  reducers: {
    addMessage: (state, action) => {
      messagesAdapter.addOne(state, action);
    },
  },
  extraReducers: {
    [channels.actions.initState]: (state, action) => {
      messagesAdapter.setAll(state, action.payload.messages);
    },
    [channels.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = messagesSelectors
        .selectAll(state)
        .filter((m) => m.channelId === action.payload)
        .map((m) => m.id);
      messagesAdapter.removeMany(state, channelMessagesIds);
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
