import { createSelector } from '@reduxjs/toolkit';

import { messagesSelectors, channelSelector } from '../store/index.js';

export const allChannels = (state) => channelSelector.selectAll(state.channels);
export const allMessages = (state) => messagesSelectors.selectAll(state.messages);

export const currentChannelId = (state) => state.channels.currentChannelId;

export const allChannelsNames = createSelector(
  allChannels,
  (channels) => channels.map(({ name }) => name),
);

export const currentChannel = createSelector(
  allChannels,
  currentChannelId,
  (channels, channelId) => channels.find((ch) => ch.id === channelId),
);

export const currentChannelMessages = createSelector(
  allMessages,
  currentChannelId,
  (messages, channelId) => messages.filter((m) => m.channelId === channelId),
);

export const modalSelector = (state) => state.modal;
