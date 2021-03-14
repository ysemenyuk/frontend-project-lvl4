import React from 'react';
import { useSelector } from 'react-redux';

import { currentChannelMessages } from '../selectors/index.js';

const ChatBox = () => {
  const messages = useSelector(currentChannelMessages);
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map((message) => (
        <div key={message.id} className="text-break">
          <b>{`${message.nickname}`}</b>
          {`: ${message.text}`}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
