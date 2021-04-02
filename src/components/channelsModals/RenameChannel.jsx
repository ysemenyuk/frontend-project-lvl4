import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';
import { channelsSelectors } from '../../store/selectors.js';
import channelValidationSchema from './channelValidationSchema.js';

const RenameChannel = (props) => {
  const { modalData, onCloseModal } = props;
  const { t } = useTranslation();

  const inputRef = useRef();

  const channelsNames = useSelector(channelsSelectors.selectAllChannelsNames);
  const validationSchema = useMemo(() => channelValidationSchema(channelsNames),
    [channelsNames]);

  useEffect(() => {
    inputRef?.current.select();
  }, []);

  useEffect(() => {
    inputRef?.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: modalData.name,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setFieldError }) => {
      const url = routes.channelPath(modalData.id);
      return axios
        .patch(url, {
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
        <Modal.Title>{t('renameChannel')}</Modal.Title>
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
              value={formik.values.text}
              disabled={formik.isSubmitting}
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

export default RenameChannel;
