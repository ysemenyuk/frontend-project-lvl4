import React from 'react';

import ChannelsList from './ChannelsList.jsx';
import ChatBox from './ChatBox.jsx';
import NewMessageForm from './NewMessageForm.jsx';

const App = (gon) => {
  console.log('app gon', gon);

  const { gon: { channels, messages, currentChannelId } } = gon;
  console.log('app channels', channels);
  console.log('app messages', messages);

  return (
    <div className="row h-100 pb-3">

      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="ml-auto p-0 btn btn-link">+</button>
        </div>
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
      </div>

      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <ChatBox messages={messages} />
          <NewMessageForm />
        </div>
      </div>

    </div>
  );
};

export default App;
