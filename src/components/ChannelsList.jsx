import React from 'react';

import ChannelsListItem from './ChannelsListItem.jsx';

const ChannelsList = (props) => {
  console.log('ChannelsList');

  const {
    channels, currentChannelId, onSelectChannel,
    onRemoveChannel, onRenameChannel,
  } = props;

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item">
          <ChannelsListItem
            channel={channel}
            currentChannelId={currentChannelId}
            onSelectChannel={onSelectChannel}
            onRemoveChannel={onRemoveChannel}
            onRenameChannel={onRenameChannel}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
