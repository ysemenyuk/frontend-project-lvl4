import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../store/index.js';
import { modalSelector } from '../../selectors/index.js';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const { modalShow, modalTitle, modalData } = useSelector(modalSelector);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

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
    <Modal
      modalShow={modalShow}
      modalData={modalData}
      onCloseModal={handleCloseModal}
    />
  );
};

export default ChannelsModal;
