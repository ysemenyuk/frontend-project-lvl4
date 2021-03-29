import { createSelector } from '@reduxjs/toolkit';

import { adapterChannelsSelectors, adapterMessagesSelectors } from '../store/index.js';

const selectCurrentChannelId = (state) => state.channels.currentChannelId;

const selectAllChannelsNames = createSelector(
  adapterChannelsSelectors.selectAll,
  (channels) => channels.map(({ name }) => name),
);

const selectCurrentChannel = createSelector(
  adapterChannelsSelectors.selectAll,
  selectCurrentChannelId,
  (channels, channelId) => channels.find((ch) => ch.id === channelId),
);

const selectCurrentChannelMessages = createSelector(
  adapterMessagesSelectors.selectAll,
  selectCurrentChannelId,
  (messages, channelId) => messages.filter((m) => m.channelId === channelId),
);

export const channelsSelectors = {
  ...adapterChannelsSelectors, selectAllChannelsNames, selectCurrentChannel,
};

export const messagesSelectors = { ...adapterMessagesSelectors, selectCurrentChannelMessages };

export const selectModal = (state) => state.modal;
