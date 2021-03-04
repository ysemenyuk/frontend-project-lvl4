import React from 'react';

const ChatBox = (props) => {
  console.log('ChatBox props', props);

  const { messages } = props;
  const messagesList = messages.map((message) => (
    <div key={message.id} className="text-break">
      {message.nickname}
      :
      {message.text}
    </div>
  ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.length === 0 ? null : messagesList}
    </div>
  );
};

export default ChatBox;
