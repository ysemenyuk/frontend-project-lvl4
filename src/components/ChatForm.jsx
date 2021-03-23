import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Button, Form, Spinner, InputGroup,
} from 'react-bootstrap';

import routes from '../routes.js';

const ChatForm = (props) => {
  console.log('chatform');

  const { channel, nickname } = props;
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelMessagesPath(channel.id);
      axios.post(url, {
        data: {
          attributes: { nickname, text: values.text, time: new Date() },
        },
      })
        .then(() => {
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          setSubmitting(false);
          setFieldError('network', err.message);
        });
    },
  });

  return (
    <div id="new-message-form" className="mt-3">

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup>

            <Form.Control
              // className="mr-2"
              aria-describedby="basic-addon2"
              type="text"
              name="text"
              // autoFocus
              placeholder={`Message #${channel.name}`}
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.text}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.text || formik.errors.network}
            />

            <InputGroup.Append>
              <Button
                disabled={formik.isSubmitting || !formik.values.text.trim()}
                type="submit"
                id="basic-addon2"
              >
                {t('send')}
                <span> </span>
                <Spinner
                  style={{ display: formik.isSubmitting ? 'inline-block' : 'none' }}
                  as="span"
                  animation="border"
                  size="sm"
                />
              </Button>
            </InputGroup.Append>

            <Form.Control.Feedback type="invalid">
              {formik.errors.text}
              {formik.errors.network}
            </Form.Control.Feedback>

          </InputGroup>
        </Form.Group>
      </Form>

    </div>
  );
};

export default ChatForm;
