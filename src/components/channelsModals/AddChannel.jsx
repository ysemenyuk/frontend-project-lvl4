/* eslint-disable object-curly-newline */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import routes from '../../routes.js';

import { closeModal } from '../../store/index.js';
import { modalSelector } from '../../selectors/index.js';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { modalShow } = useSelector(modalSelector);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const initialValues = {
    text: '',
  };

  const validationSchema = Yup.object({
    text: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
  });

  const onSubmitHandler = (values, { setSubmitting, resetForm, setFieldError }) => {
    const url = routes.channelsPath();
    axios.post(url, {
      data: {
        attributes: { name: values.text },
      },
    })
      .then((responce) => {
        console.log('onSubmitHandler responce', responce.data.data.attributes);
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
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  name="text"
                  type="text"
                  ref={inputRef}
                  onChange={handleChange}
                  value={values.text}
                  disabled={isSubmitting}
                  isInvalid={!!errors.text || !!errors.network}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.text}
                  {errors.network}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="mr-1" disabled={isSubmitting} onClick={handleClose}>
                  Cancle
                </Button>
                <Button variant="primary" className="mr-1" disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </div>

            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
