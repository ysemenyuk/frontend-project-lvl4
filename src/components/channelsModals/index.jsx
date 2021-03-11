import React from 'react';
import { useSelector } from 'react-redux';
// import { Modal } from 'react-bootstrap';

import { modalSelector } from '../../selectors/index.js';
import AddModal from './AddModal.jsx';
import RemoveModal from './RemoveModal.jsx';
import RenameModal from './RenameModal.jsx';

const ChannelsModal = () => {
  const { modalShow, modalTitle } = useSelector(modalSelector);

  const modals = {
    adding: AddModal,
    removing: RemoveModal,
    renaming: RenameModal,
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
