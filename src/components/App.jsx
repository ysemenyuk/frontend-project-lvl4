import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import ChannelsList from './ChannelsList.jsx';
import ChatBox from './ChatBox.jsx';
import NewMessageForm from './NewMessageForm.jsx';
import ChannelsModal from './channelsModals/index.jsx';
import AppContext from '../appContext.js';

import ApiTest from './ApiTest.jsx';

import { openModal } from '../store/index.js';

const App = () => {
  const { rollbar } = useContext(AppContext);
  const dispatch = useDispatch();

  const handleModal = (modalTitle) => () => {
    rollbar.info('User opened adding modal');
    dispatch(openModal({ modalTitle }));
  };

  return (
    <div className="row h-100 pb-3">
      <ChannelsModal />
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <h5>Channels</h5>
          <button
            onClick={handleModal('adding')}
            type="button"
            className="ml-auto p-0 btn btn-link"
            data-toggle="modal"
            data-target="#addingModal"
          >
            Add
          </button>
        </div>
        <ChannelsList />
      </div>

      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <h5>Chat</h5>
          <ChatBox />
          <NewMessageForm />
          <ApiTest />
        </div>
      </div>

    </div>
  );
};

export default App;
