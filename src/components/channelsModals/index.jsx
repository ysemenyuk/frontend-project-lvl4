import React from 'react';
import { useSelector } from 'react-redux';
// import { Modal } from 'react-bootstrap';

import { modalSelector } from '../../selectors/index.js';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const ChannelsModal = () => {
  const { modalShow, modalTitle } = useSelector(modalSelector);

  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
  };

  if (modalShow === false) {
    return null;
  }

  const Modal = modals[modalTitle];

  return (
    <Modal />
  );
};

export default ChannelsModal;
