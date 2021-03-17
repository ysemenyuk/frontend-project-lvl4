import React, { useEffect, useRef } from 'react';

const ChatList = ({ messages }) => {
  const messagesContainer = useRef();

  useEffect(() => {
    // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messagesContainer} className="overflow-auto mb-3">
      {messages.map((message) => (
        <div key={message.id} className="text-break">
          <b>{`${message.nickname}`}</b>
          {`: ${message.text}`}
        </div>
      ))}
      {/* <div ref={messagesEndRef} /> */}
    </div>
  );
};

export default ChatList;
