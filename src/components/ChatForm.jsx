import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Button, Form, Spinner, InputGroup,
} from 'react-bootstrap';

import routes from '../routes.js';
import { messageValidationSchema } from '../validationSchema.js';

const ChatForm = (props) => {
  const { channel, contextProps: { nickname } } = props;
  const { t } = useTranslation();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: messageValidationSchema,
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

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup>

            <Form.Control
              className="mr-2"
              type="text"
              name="text"
              placeholder={`Message #${channel.name}`}
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.text}
              disabled={formik.isSubmitting}
              isInvalid={!!formik.errors.text || !!formik.errors.network}
            />

            <InputGroup.Append>
              <Button disabled={formik.isSubmitting} type="submit">
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
