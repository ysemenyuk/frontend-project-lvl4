/* eslint-disable object-curly-newline */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { apiAddMessage } from '../services/apiService.js';

const NewMessageForm = () => {
  const initialValues = {
    messageText: '',
  };

  const validationSchema = Yup.object({
    messageText: Yup.string()
      .max(30, 'Too Long!')
      .required('Required'),
  });

  const onSubmitHandler = (values, { setSubmitting, resetForm, setFieldError }) => {
    // console.log('onSubmitHandler values', values);
    apiAddMessage({ nickname: 'nickname', channelId: 1, text: values.messageText })
      .then((responce) => {
        console.log('onSubmitHandler responce', responce);
        setSubmitting(false);
        resetForm();
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitting(false);
        setFieldError('network', err.message);
      });
  };

  return (
    <div id="new-message-form" className="mt-auto">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className="new-message-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <div className="input-group">
                <Field
                  id="messageText"
                  name="messageText"
                  className="mr-2 form-control"
                  onChange={handleChange}
                  value={values.messageText}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <div className="d-block invalid-feedback">
                  <ErrorMessage name="messageText" />
                  <ErrorMessage name="network" />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default NewMessageForm;
