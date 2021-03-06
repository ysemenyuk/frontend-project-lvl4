/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AppContext } from '../init.jsx';
import { apiAddMessage } from '../services/apiService.js';

const NewMessageForm = () => {
  const channelId = useSelector((state) => state.chat.currentChannelId);
  const nickname = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    validationSchema: Yup.object({
      messageText: Yup.string()
        .max(30, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      console.log('values', values);
      apiAddMessage({ nickname, channelId, text: values.messageText })
        .then((responce) => {
          console.log('onSubmitHandler responce', responce);
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          console.log(err.message);
          setFieldError('network', 'network error');
        });
    },
  });

  return (
    <div id="new-message-form" className="mt-auto">

      <form className="new-message-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              name="messageText"
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
              Submit
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

export default NewMessageForm;
