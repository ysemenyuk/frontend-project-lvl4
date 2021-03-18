import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';

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

  const ModalBody = modals[modalTitle];

  return (
    <Modal show={modalShow} onHide={handleCloseModal}>
      <ModalBody
        modalData={modalData}
        onCloseModal={handleCloseModal}
      />
    </Modal>
  );
};

export default ChannelsModal;
