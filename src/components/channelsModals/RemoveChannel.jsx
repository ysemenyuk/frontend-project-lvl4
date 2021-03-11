/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';

import routes from '../../routes.js';

import { closeModal } from '../../store/index.js';
import { modalSelector } from '../../selectors/index.js';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { modalShow, modalData } = useSelector(modalSelector);
  console.log('modalData', modalData);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const initialValues = {
    text: '',
  };

  const onSubmitHandler = (values, { setSubmitting, resetForm, setFieldError }) => {
    const url = routes.channelPath(modalData.id);
    axios.delete(url)
      .then((responce) => {
        console.log('onSubmitHandler responce', responce);
        setSubmitting(false);
        resetForm();
        dispatch(closeModal());
      })
      .catch((err) => {
        console.log('onSubmitHandler error', err.message);
        setSubmitting(false);
        setFieldError('network', err.message);
      });
  };

  return (
    <Modal show={modalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
        >
          {({
            handleSubmit,
            isSubmitting,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  name="text"
                  type="text"
                  value="Are you sure?"
                  disabled
                  isInvalid={!!errors.network}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.network}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="mr-1" disabled={isSubmitting} onClick={handleClose}>
                  Cancle
                </Button>
                <Button variant="danger" className="mr-1" disabled={isSubmitting} type="submit">
                  Confirm
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
