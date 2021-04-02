import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';

import { modalActions } from '../store/slices.js';
import { selectModal } from '../store/selectors.js';

// import AddChannel from './channelsModals/AddChannel.jsx';
// import RenameChannel from './channelsModals/RenameChannel.jsx';
import RemoveChannel from './channelsModals/RemoveChannel.jsx';
import AddOrRenameChannel from './channelsModals/AddOrRenameChannel.jsx';

const modals = {
  adding: AddOrRenameChannel,
  removing: RemoveChannel,
  renaming: AddOrRenameChannel,
};

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const { modalShow, modalType, modalData } = useSelector(selectModal);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  if (modalShow === false) {
    return null;
  }

  const ModalBody = modals[modalType];

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
