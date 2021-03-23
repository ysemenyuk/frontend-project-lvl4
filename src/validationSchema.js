import * as Yup from 'yup';

export const channelValidationSchema = (channelNames) => Yup.object({
  text: Yup.string()
    .min(3, 'Must be more than 3 characters!')
    .max(30, 'Must be less than 30 characters!')
    .required('Should not be empty')
    .notOneOf(channelNames, 'Must be unique'),
});

export const messageValidationSchema = Yup.object({
  text: Yup.string()
    .required('Should not be empty'),
});
