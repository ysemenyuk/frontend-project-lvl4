/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// import store from './components/store.js';
import App from './components/App.jsx';
import chatReducer from './components/chatSlice.js';

export default (gon) => {
  const store = configureStore({
    reducer: {
      chat: chatReducer,
    },
  });

  // console.log(11, gon);
  // console.log(22, store);

  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} />
    </Provider>,
    document.getElementById('chat'),
  );
};
