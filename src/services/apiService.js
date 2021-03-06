import axios from 'axios';
import routes from '../routes.js';

const apiAddMessage = ({ channelId, nickname, text }) => {
  const url = routes.channelMessagesPath(channelId);
  return axios.post(url, {
    data: {
      attributes: { nickname, text },
    },
  });
};

const apiAddChannel = ({ name }) => {
  const url = routes.channelsPath();
  return axios.post(url, {
    data: {
      attributes: { name },
    },
  });
};

const apiGetChannels = () => {
  const url = routes.channelsPath();
  return axios.get(url);
};

export { apiAddMessage, apiAddChannel, apiGetChannels };
