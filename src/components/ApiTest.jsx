import React, { useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AppContext from '../appContext.js';
import { currentChannel } from '../selectors/index.js';
import routes from '../routes.js';

const ApiTest = () => {
  const channelId = useSelector(currentChannel);
  const { nickname, rollbar } = useContext(AppContext);

  const testAddMessageHandler = (e) => {
    e.preventDefault();
    const url = routes.channelMessagesPath(channelId);
    axios.post(url, {
      data: {
        attributes: { nickname, text: 'test text' },
      },
    })
      .then((responce) => {
        console.log('testAddMessageHandler responce', responce.data.data.attributes);
      })
      .catch((err) => {
        console.log('testAddMessageHandler error', err.message);
      });
  };

  const testAddChannelHandler = (e) => {
    e.preventDefault();
    const url = routes.channelsPath();
    axios.post(url, {
      data: {
        attributes: { name: 'test channel name' },
      },
    })
      .then((responce) => {
        console.log('testAddChannelHandler responce', responce.data.data.attributes);
      })
      .catch((err) => {
        console.log('testAddChannelHandler error', err.message);
      });
  };

  const testAddErrorHandler = (e) => {
    e.preventDefault();
    console.log('rollbar', rollbar);
    rollbar.error('test Add Error');
    console.log('test Add Error');
  };

  return (
    <div>
      <button onClick={testAddMessageHandler} type="button" className="btn btn-primary mr-1">addMessage</button>
      <button onClick={testAddChannelHandler} type="button" className="btn btn-primary mr-1">addChannel</button>
      <button onClick={testAddErrorHandler} type="button" className="btn btn-primary mr-1">addError</button>
    </div>
  );
};

export default ApiTest;
