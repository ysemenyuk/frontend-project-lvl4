import * as Yup from 'yup';

export default (channelsNames) => Yup.object({
  text: Yup.string()
    .min(3)
    .max(30)
    .required()
    .notOneOf(channelsNames),
});
