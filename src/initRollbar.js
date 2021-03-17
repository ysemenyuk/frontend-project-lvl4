import Rollbar from 'rollbar';

const accessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN;
const environment = process.env.NODE_ENV || 'development';

console.log('Rollbar process.env.POST_CLIENT_ITEM_ACCESS_TOKEN', process.env.POST_CLIENT_ITEM_ACCESS_TOKEN);
console.log('Rollbar accessToken', accessToken);

export default () => new Rollbar({
  accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment,
  },
});
