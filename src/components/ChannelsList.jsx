import React from 'react';

import ChannelsListItem from './ChannelsListItem.jsx';

const ChannelsList = (props) => {
  console.log('channels');
  const {
    channels, currentChannelId, setCurrent, handleModal,
  } = props;

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item">
          <ChannelsListItem
            channel={channel}
            currentChannelId={currentChannelId}
            setCurrent={setCurrent}
            handleModal={handleModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
