import React from 'react';

const ChannelsListItem = (props) => {
  const {
    currentChannelId, setCurrent, handleModal, channel: { id, name, removable },
  } = props;

  const currentClass = currentChannelId === id ? 'btn-primary' : 'btn-light';

  if (removable === false) {
    return (
      <button
        onClick={setCurrent(id)}
        type="button"
        className={`btn ${currentClass} nav-link btn-block mb-2 text-left`}
      >
        {name}
      </button>
    );
  }

  return (
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
  );
};

export default ChannelsListItem;
