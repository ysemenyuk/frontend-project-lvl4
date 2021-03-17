import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const AddChannel = (props) => {
  const { modalShow, onCloseModal } = props;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      .then(() => {
        setSubmitting(false);
        resetForm();
        onCloseModal();
      })
      .catch((err) => {
        setSubmitting(false);
        setFieldError('network', err.message);
      });
  };

  return (
    <Modal show={modalShow} onHide={onCloseModal}>
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
                <Button variant="secondary" className="mr-1" disabled={isSubmitting} onClick={onCloseModal}>
                  Cancle
                </Button>
                <Button variant="primary" className="mr-1" disabled={isSubmitting} type="submit">
                  Submit
                  <span> </span>
                  <Spinner
                    style={{ display: isSubmitting ? 'inline-block' : 'none' }}
                    as="span"
                    animation="border"
                    size="sm"
                  />
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
