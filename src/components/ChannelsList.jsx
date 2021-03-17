import React from 'react';

import ChannelsListItem from './ChannelsListItem.jsx';

const ChannelsList = (props) => {
  const {
    channels, currentChannelId, onSelectChannel,
    onOpenModalForRemoveChannel, onOpenModalForRenameChannel,
  } = props;

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item">
          <ChannelsListItem
            channel={channel}
            currentChannelId={currentChannelId}
            onSelectChannel={onSelectChannel}
            onOpenModalForRemoveChannel={onOpenModalForRemoveChannel}
            onOpenModalForRenameChannel={onOpenModalForRenameChannel}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
