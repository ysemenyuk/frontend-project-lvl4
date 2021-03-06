/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const ChannelsList = (props) => {
  // console.log('ChannelsList props', props);
  const { channels, currentChannelId } = props;

  const channelsList = channels.map(({ id, name, removable }) => {
    const currentClass = currentChannelId === id ? 'btn-primary' : 'btn-light';
    if (removable === false) {
      return (
        <li key={id} className="nav-item">
          <button type="button" className={`nav-link btn-block mb-2 text-left btn ${currentClass}`}>{name}</button>
        </li>
      );
    }
    return (
      <li key={id} className="nav-item">
        <div className="d-flex mb-2 dropdown btn-group">
          <button type="button" className={`text-left flex-grow-1 nav-link btn ${currentClass}`}>{name}</button>
          <button type="button" className={`flex-grow-0 btn ${currentClass} dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Remove</a>
            <a className="dropdown-item" href="#">Rename</a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channelsList}
    </ul>
  );
};

export default ChannelsList;
