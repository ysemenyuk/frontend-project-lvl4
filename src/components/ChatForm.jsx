import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import routes from '../routes.js';

const messageValidationSchema = Yup.object({
  messageText: Yup.string()
    .max(30, 'Too Long!')
    .required('Required'),
});

const ChatForm = (props) => {
  const { channel, contextProps: { nickname, rollbar } } = props;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    validationSchema: messageValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelMessagesPath(channel.id);
      axios.post(url, {
        data: {
          attributes: { nickname, text: values.messageText, time: new Date() },
        },
      })
        .then(() => {
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          rollbar.error('ChatForm onSubmitHandler error', err.message);
          setSubmitting(false);
          setFieldError('network', err.message);
        });
    },
  });

  return (
    <div id="new-message-form" className="mt-3">

      <form className="new-message-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              name="messageText"
              placeholder={`Message #${channel.name}`}
              ref={inputRef}
              className="mr-2 form-control"
              onChange={formik.handleChange}
              value={formik.values.messageText}
              disabled={formik.isSubmitting}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              Send
            </button>

            <div className="d-block invalid-feedback">
              {formik.errors.messageText ? formik.errors.messageText : null}
              {formik.errors.network ? formik.errors.network : null}
            </div>

          </div>
        </div>
      </form>

    </div>
  );
};

export default ChatForm;
