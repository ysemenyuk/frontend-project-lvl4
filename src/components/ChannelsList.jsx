import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allChannels, currentChannel } from '../selectors/index.js';
import { setCurrentChannel, openModal } from '../store/index.js';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(allChannels);
  const currentChannelId = useSelector(currentChannel);
  const setCurrent = (id) => () => dispatch(setCurrentChannel(id));

  const handleModal = (modalTitle, modalData) => () => {
    dispatch(openModal({ modalTitle, modalData }));
  };

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
                <button onClick={handleModal('removing', { id, name })} className="dropdown-item" type="button">Remove</button>
                <button onClick={handleModal('renaming', { id, name })} className="dropdown-item" type="button">Rename</button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
