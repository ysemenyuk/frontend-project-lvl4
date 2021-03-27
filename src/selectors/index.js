import { createSelector } from '@reduxjs/toolkit';

import { messagesSelectors, channelsSelectors } from '../store/index.js';

export const selectAllChannels = (state) => channelsSelectors.selectAll(state.channels);
export const selectAllMessages = (state) => messagesSelectors.selectAll(state.messages);

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const selectAllChannelsNames = createSelector(
  selectAllChannels,
  (channels) => channels.map(({ name }) => name),
);

export const selectCurrentChannel = createSelector(
  selectAllChannels,
  selectCurrentChannelId,
  (channels, channelId) => channels.find((ch) => ch.id === channelId),
);

export const selectCurrentChannelMessages = createSelector(
  selectAllMessages,
  selectCurrentChannelId,
  (messages, channelId) => messages.filter((m) => m.channelId === channelId),
);

export const selectModal = (state) => state.modal;
