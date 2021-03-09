import React from 'react';
import { useSelector } from 'react-redux';

import { currentChannelMessagesSelector } from '../selectors/index.js';

const ChatBox = () => {
  const currentChannelMessages = useSelector(currentChannelMessagesSelector);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {currentChannelMessages.map((message) => (
        <div key={message.id} className="text-break">
          {`${message.nickname} : ${message.text}`}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
