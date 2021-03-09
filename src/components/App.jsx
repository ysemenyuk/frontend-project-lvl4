/* eslint-disable import/no-cycle */
import React from 'react';
import { useDispatch } from 'react-redux';

import ChannelsList from './ChannelsList.jsx';
import ChatBox from './ChatBox.jsx';
import NewMessageForm from './NewMessageForm.jsx';
import Modal from './Modal.jsx';

import ApiTest from './ApiTest.jsx';

import { openModal } from '../store/index.js';

const App = () => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(openModal({ modalTitle: 'name', modalData: 'data' }));
  };

  return (
    <div className="row h-100 pb-3">
      <Modal />
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <h5>Channels</h5>
          <button
            onClick={openModalHandler}
            type="button"
            className="ml-auto p-0 btn btn-link"
            data-toggle="modal"
            data-target="#exampleModal"
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
