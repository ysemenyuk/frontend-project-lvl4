import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';

import { modalActions } from '../../store/slices.js';
import { selectModal, channelsSelectors } from '../../store/selectors.js';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const channelNameValidationSchema = (channelsNames) => Yup.object({
  text: Yup.string()
    .min(3)
    .max(30)
    .required()
    .notOneOf(channelsNames),
});

const ChannelsModal = () => {
  const dispatch = useDispatch();
  const { modalShow, modalType, modalData } = useSelector(selectModal);
  const channelsNames = useSelector(channelsSelectors.selectAllChannelsNames);

  const validationSchema = useMemo(() => channelNameValidationSchema(channelsNames),
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
        validationSchema={validationSchema}
        onCloseModal={handleCloseModal}
      />
    </Modal>
  );
};

export default ChannelsModal;
