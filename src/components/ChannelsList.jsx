import React from 'react';
import { useTranslation } from 'react-i18next';

const ChannelsList = (props) => {
  const { t } = useTranslation();
  const {
    channels, currentChannel, onSelectChannel,
    onRemoveChannel, onRenameChannel,
  } = props;

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((channel) => {
        const { id, name, removable } = channel;
        const currentClass = currentChannel.id === id ? 'btn-primary' : 'btn-light';
        return (
          <li key={channel.id} className="nav-item">
            {removable === false
              ? (
                <button
                  onClick={onSelectChannel(id)}
                  type="button"
                  className={`btn ${currentClass} nav-link btn-block mb-2 text-left`}
                >
                  #
                  {' '}
                  {name}
                </button>
              )
              : (
                <div className="btn-group d-flex mb-2 dropdown">
                  <button
                    onClick={onSelectChannel(id)}
                    type="button"
                    className={`btn ${currentClass} text-left flex-grow-1 nav-link`}
                  >
                    #
                    {' '}
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
                    <button onClick={onRemoveChannel(channel)} className="dropdown-item" type="button">{t('remove')}</button>
                    <button onClick={onRenameChannel(channel)} className="dropdown-item" type="button">{t('rename')}</button>
                  </div>
                </div>
              )}
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
