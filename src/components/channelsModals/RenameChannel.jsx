import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import axios from 'axios';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';
import channelNameValidationSchema from './channelNameValidationSchema.js';

const RenameChannel = (props) => {
  const { modalData, onCloseModal } = props;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      text: modalData.name,
    },
    validationSchema: channelNameValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelPath(modalData.id);
      axios.patch(url, {
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
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Group>
            <Form.Control
              name="text"
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.text}
              disabled={formik.isSubmitting}
              isInvalid={!!formik.errors.text || !!formik.errors.network}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.text}
              {formik.errors.network}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              Cancle
            </Button>
            <Button variant="primary" className="mr-1" disabled={formik.isSubmitting} type="submit">
              Submit
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

export default RenameChannel;
