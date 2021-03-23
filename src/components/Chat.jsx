import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

import ChatForm from './ChatForm.jsx';
import ChatList from './ChatList.jsx';

import AppContext from '../context.js';
import { currentChannelMessages, currentChannel } from '../selectors/index.js';

const Chat = () => {
  console.log('chat');

  const messages = useSelector(currentChannelMessages);
  const channel = useSelector(currentChannel);
  const { nickname } = useContext(AppContext);

  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom pb-2 d-flex">
        <h5>
          Chat
          <span>  </span>
          <Badge variant="info">{`#${channel.name}`}</Badge>
        </h5>
      </div>
      <ChatList messages={messages} />
      <ChatForm channel={channel} nickname={nickname} />
    </div>
  );
};

export default Chat;
