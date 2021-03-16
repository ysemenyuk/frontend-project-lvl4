import { createSelector } from '@reduxjs/toolkit';

import { chatSelectors } from '../store/index.js';

export const allChannels = (state) => chatSelectors.selectAll(state.channels);
export const allMessages = (state) => chatSelectors.selectAll(state.messages);

export const currentChannel = (state) => state.channels.currentChannelId;

export const currentChannelMessages = createSelector(
  allMessages,
  currentChannel,
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const modalSelector = (state) => state.modal;
