import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { allChannels, currentChannelId } from '../selectors/index.js';
import { selectChannel, openModal } from '../store/index.js';

import ChannelsModal from './channelsModals/index.jsx';
import ChannelsList from './ChannelsList.jsx';
import AppContext from '../context.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(allChannels);
  const currentChannel = useSelector(currentChannelId);
  const contextProps = useContext(AppContext);
  const { t } = useTranslation();

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel(id));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ modalType: 'adding' }));
  };

  const handleRemoveChannel = (modalData) => () => {
    dispatch(openModal({ modalType: 'removing', modalData }));
  };

  const handleRenameChannel = (modalData) => () => {
    dispatch(openModal({ modalType: 'renaming', modalData }));
  };

  return (
    <>
      <div className="border-bottom pb-2 mb-3 d-flex">
        <h5>{t('channels')}</h5>
        <button
          onClick={handleAddChannel}
          type="button"
          className="ml-auto p-0 mb-2 btn btn-link"
        >
          {t('addChannel')}
        </button>
      </div>
      <ChannelsList
        contextProps={contextProps}
        currentChannelId={currentChannel}
        channels={channels}
        onSelectChannel={handleSelectChannel}
        onRemoveChannel={handleRemoveChannel}
        onRenameChannel={handleRenameChannel}
      />
      <ChannelsModal />
    </>
  );
};

export default Channels;
