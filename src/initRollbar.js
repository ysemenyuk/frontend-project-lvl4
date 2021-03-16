import Rollbar from 'rollbar';

const accessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN;
const environment = process.env.NODE_ENV || 'development';

export default () => new Rollbar({
  accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment,
  },
});
