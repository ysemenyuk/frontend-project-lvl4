import Rollbar from 'rollbar';

const accessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN;
const environment = process.env.NODE_ENV || 'development';

console.log('Rollbar process.env.POST_CLIENT_ITEM_ACCESS_TOKEN', process.env.POST_CLIENT_ITEM_ACCESS_TOKEN);
console.log('Rollbar accessToken', accessToken);
console.log('Rollbar process.env', process.env);
console.log('Rollbar ROLLBAR_ACCESS_TOKEN', process.env.ROLLBAR_ACCESS_TOKEN);

export default () => new Rollbar({
  accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment,
  },
});
