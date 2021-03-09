/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import routes from '../routes.js';

import { AppContext } from '../init.jsx';
import { currentChannelSelector } from '../selectors/index.js';

const NewMessageForm = () => {
  const channelId = useSelector(currentChannelSelector);
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
      const url = routes.channelMessagesPath(channelId);
      axios.post(url, {
        data: {
          attributes: { nickname, text: values.messageText },
        },
      })
        .then((responce) => {
          console.log('onSubmitHandler responce', responce.data.data.attributes);
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          console.log('onSubmitHandler error', err.message);
          setFieldError('network', err.message);
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
