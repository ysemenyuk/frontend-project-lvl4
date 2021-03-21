import * as Yup from 'yup';

export const channelValidationSchema = (channelNames) => Yup.object({
  text: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
    .notOneOf(channelNames, 'notOneOf'),
});

export const messageValidationSchema = Yup.object({
  text: Yup.string()
    .max(10, 'Too Long!')
    .required('Required'),
});
