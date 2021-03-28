/* eslint-disable object-curly-newline */
import React, { useEffect, useRef } from 'react';
import { Badge } from 'react-bootstrap';

const ChatList = ({ messages }) => {
  const messagesContainer = useRef();

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messagesContainer} className="overflow-auto mt-auto">
      {messages.map(({ id, nickname, text, time }) => {
        const t = new Date(time).toLocaleTimeString();
        return (
          <div key={id}>
            <div>
              <b>{nickname}</b>
              {' '}
              <Badge variant="light">{t}</Badge>
            </div>
            <div>
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
