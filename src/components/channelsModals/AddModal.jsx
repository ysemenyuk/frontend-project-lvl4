import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { closeModal } from '../../store/index.js';
import { modalSelector } from '../../selectors/index.js';

const AddModal = () => {
  const dispatch = useDispatch();
  const { modalShow } = useSelector(modalSelector);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={modalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
