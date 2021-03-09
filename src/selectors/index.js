import { createSelector } from '@reduxjs/toolkit';

import { channelsAdapter, messagesAdapter } from '../store/index.js';

export const currentChannelSelector = (state) => state.chat.currentChannelId;
export const channelsSelector = (state) => channelsAdapter.getSelectors().selectAll(state.channels);
export const messagesSelector = (state) => messagesAdapter.getSelectors().selectAll(state.messages);

export const currentChannelMessagesSelector = createSelector(
  messagesSelector,
  currentChannelSelector,
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const modalSelector = (state) => state.modal;
