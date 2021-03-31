import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const AddChannel = (props) => {
  const { onCloseModal, validationSchema } = props;
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setFieldError }) => {
      const url = routes.channelsPath();
      return axios
        .post(url, {
          data: {
            attributes: { name: values.text },
          },
        })
        .then(() => {
          onCloseModal();
        })
        .catch((err) => {
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
            <Form.Label>{t('channelName')}</Form.Label>
            <Form.Control
              name="text"
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              value={formik.values.text}
              isInvalid={!!formik.errors.text || !!formik.errors.network}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.text ? t(formik.errors.text.key) : null}
              {formik.errors.network}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="primary" className="mr-1" disabled={formik.isSubmitting} type="submit">
              {t('submit')}
              {' '}
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
