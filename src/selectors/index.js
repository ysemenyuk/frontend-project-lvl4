import { createSelector } from '@reduxjs/toolkit';

import { channelsAdapter, messagesAdapter } from '../store/index.js';

export const currentChannel = (state) => state.chat.currentChannelId;

const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const allChannels = (state) => channelsSelectors.selectAll(state);

const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const allMessages = (state) => messagesSelectors.selectAll(state);

export const currentChannelMessages = createSelector(
  allMessages,
  currentChannel,
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const modalSelector = (state) => state.modal;
