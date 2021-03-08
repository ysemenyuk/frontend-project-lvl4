import React from 'react';
import { useSelector } from 'react-redux';

const ChatBox = (props) => {
  // console.log('ChatBox props', props);
  const { messages } = props;
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messagesForShow = messages.filter((m) => m.channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messagesForShow.map((message) => (
        <div key={message.id} className="text-break">
          {`${message.nickname} : ${message.text}`}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
