import React from 'react';

const ChatList = ({ messages }) => {
  console.log('messages');
  return (
    <div className="overflow-auto mb-3">
      {messages.map((message) => (
        <div key={message.id} className="text-break">
          <b>{`${message.nickname}`}</b>
          {`: ${message.text}`}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
