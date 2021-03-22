import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const RemoveChannel = (props) => {
  const { modalData, onCloseModal } = props;
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = routes.channelPath(modalData.id);
    axios.delete(url)
      .then(() => {
        setSubmitting(false);
        onCloseModal();
      })
      .catch(() => {
        setSubmitting(false);
        setError('Network Error');
      });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>

          <div className="mb-1">
            {t('sureRemove')}
          </div>

          <div className="mb-3">
            <b>{`"${modalData.name}"`}</b>
          </div>

          <div className="text-danger">
            <small>{error}</small>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={submitting} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="danger" className="mr-1" disabled={submitting} type="submit">
              {t('confirm')}
              <span> </span>
              <Spinner
                style={{ display: submitting ? 'inline-block' : 'none' }}
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
