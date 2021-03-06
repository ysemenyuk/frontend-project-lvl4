import React from 'react';
import { apiAddMessage, apiAddChannel, apiGetChannels } from '../services/apiService.js';

const ApiTest = () => {
  const apiAddMessageHandler = (e) => {
    e.preventDefault();
    apiAddMessage({ channelId: 1, nickname: 'nickname', text: 'test message' })
      .then((responce) => {
        console.log('apiAddMessage responce', responce);
      })
      .catch((err) => console.log(err.message));
  };

  const apiAddChannelHandler = (e) => {
    e.preventDefault();
    apiAddChannel({ name: 'test channel' })
      .then((responce) => {
        console.log('apiAddChannel responce', responce);
      })
      .catch((err) => console.log(err.message));
  };

  const apiGetChannelsHandler = (e) => {
    e.preventDefault();
    apiGetChannels()
      .then((responce) => {
        console.log('apiGetChannels responce', responce);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <button onClick={apiAddMessageHandler} type="button" className="btn btn-primary">apiAddMessage</button>
      <button onClick={apiAddChannelHandler} type="button" className="btn btn-primary">apiAddChannel</button>
      <button onClick={apiGetChannelsHandler} type="button" className="btn btn-primary">apiGetChannels</button>

    </div>
  );
};

export default ApiTest;
