import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { channelsSelectors } from '../store/selectors.js';
import { channelsActions, modalActions } from '../store/slices.js';

import ChannelsModal from './channelsModals/index.jsx';
import ChannelsList from './ChannelsList.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const { t } = useTranslation();

  const handleSelectChannel = (id) => () => {
    dispatch(channelsActions.selectChannel(id));
  };

  const handleAddChannel = () => {
    dispatch(modalActions.openModal({ modalType: 'adding' }));
  };

  const handleRemoveChannel = (modalData) => () => {
    dispatch(modalActions.openModal({ modalType: 'removing', modalData }));
  };

  const handleRenameChannel = (modalData) => () => {
    dispatch(modalActions.openModal({ modalType: 'renaming', modalData }));
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
        currentChannel={currentChannel}
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
