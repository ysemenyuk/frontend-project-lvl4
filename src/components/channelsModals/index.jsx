import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';

import { modalActions } from '../../store/index.js';
import { selectModal, selectAllChannelsNames } from '../../selectors/index.js';
import channelValidationSchema from './validationSchema.js';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const { modalShow, modalType, modalData } = useSelector(selectModal);
  const channelsNames = useSelector(selectAllChannelsNames);

  const memoizedValidationSchema = useMemo(() => channelValidationSchema(channelsNames),
    [channelsNames]);

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
        validationSchema={memoizedValidationSchema}
        onCloseModal={handleCloseModal}
      />
    </Modal>
  );
};

export default ChannelsModal;
