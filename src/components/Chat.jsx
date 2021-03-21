import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

import ChatForm from './ChatForm.jsx';
import ChatList from './ChatList.jsx';

import ApiTest from './ApiTest.jsx';

import AppContext from '../context.js';
import { currentChannelMessages, currentChannel } from '../selectors/index.js';

const Chat = () => {
  const messages = useSelector(currentChannelMessages);
  const channel = useSelector(currentChannel);
  const contextProps = useContext(AppContext);

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
      <ChatForm contextProps={contextProps} channel={channel} />
      <ApiTest />
    </div>
  );
};

export default Chat;
