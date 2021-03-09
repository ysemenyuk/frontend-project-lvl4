/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { channelsSelector, currentChannelSelector } from '../selectors/index.js';
import { setCurrentChannel } from '../store/app.js';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(currentChannelSelector);
  const setCurrent = (id) => () => dispatch(setCurrentChannel(id));

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => {
        const currentClass = currentChannelId === id ? 'btn-primary' : 'btn-light';
        if (removable === false) {
          return (
            <li key={id} className="nav-item">
              <button
                onClick={setCurrent(id)}
                type="button"
                className={`btn ${currentClass} nav-link btn-block mb-2 text-left`}
              >
                {name}
              </button>
            </li>
          );
        }
        return (
          <li key={id} className="nav-item">
            <div className="btn-group d-flex mb-2 dropdown">
              <button
                onClick={setCurrent(id)}
                type="button"
                className={`btn ${currentClass} text-left flex-grow-1 nav-link`}
              >
                {name}
              </button>
              <button
                type="button"
                className={`btn ${currentClass} flex-grow-0 dropdown-toggle dropdown-toggle-split`}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Remove</a>
                <a className="dropdown-item" href="#">Rename</a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
