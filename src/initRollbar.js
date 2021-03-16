import Rollbar from 'rollbar';

// const accessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN || null;

export default () => new Rollbar({
  accessToken: '44328a6c1c724417815434212062b05d',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
});
