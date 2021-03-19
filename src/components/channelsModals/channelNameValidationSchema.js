import * as Yup from 'yup';

const channelNameValidationSchema = Yup.object({
  text: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

export default channelNameValidationSchema;
