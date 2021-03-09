/* eslint-disable import/no-cycle */
import React from 'react';
import { useStore } from 'react-redux';

import ChannelsList from './ChannelsList.jsx';
import ChatBox from './ChatBox.jsx';
import NewMessageForm from './NewMessageForm.jsx';
import ApiTest from './ApiTest.jsx';

const App = () => {
  const store = useStore();
  console.log('app store.getState()', store.getState());

  return (
    <div className="row h-100 pb-3">

      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button
            type="button"
            className="ml-auto p-0 btn btn-link"
          >
            +
          </button>
        </div>
        <ChannelsList />
      </div>

      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <ChatBox />
          <NewMessageForm />
          <ApiTest />
        </div>
      </div>

    </div>
  );
};

export default App;
