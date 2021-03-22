import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const AddChannel = (props) => {
  console.log('add');
  const { onCloseModal, validationSchema } = props;
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    console.log('useEffect add modal', inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
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
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Group>
            <Form.Control
              name="text"
              type="text"
              // placeholder={t('enterChannelName')}
              ref={inputRef}
              // autoFocus
              onChange={formik.handleChange}
              value={formik.values.text}
              disabled={formik.isSubmitting}
              isInvalid={!!formik.errors.text || !!formik.errors.network}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.text ? formik.errors.text : null}
              {formik.errors.network ? formik.errors.network : null}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="primary" className="mr-1" disabled={formik.isSubmitting} type="submit">
              {t('submit')}
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

export default AddChannel;
