import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const RemoveChannel = (props) => {
  const { modalData, onCloseModal } = props;

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelPath(modalData.id);
      axios.delete(url)
        .then(() => {
          setSubmitting(false);
          resetForm();
          onCloseModal();
        })
        .catch((err) => {
          setSubmitting(false);
          setFieldError('network', err.message);
        });
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Group>
            <Form.Control
              name="text"
              type="text"
              value={modalData.name}
              disabled
              isInvalid={!!formik.errors.network}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.network}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              Cancle
            </Button>
            <Button variant="danger" className="mr-1" disabled={formik.isSubmitting} type="submit">
              Confirm
              <span> </span>
              <Spinner
                style={{ display: formik.isSubmitting ? 'inline-block' : 'none' }}
                as="span"
                animation="border"
                size="sm"
              />
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
