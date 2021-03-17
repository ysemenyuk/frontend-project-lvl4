import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allChannels, currentChannelId } from '../selectors/index.js';
import {
  selectChannel, openModalForAddChannel,
  openModalForRemoveChannel, openModalForRenameChannel,
} from '../store/index.js';

import ChannelsModal from './channelsModals/index.jsx';
import ChannelsList from './ChannelsList.jsx';
import AppContext from '../appContext.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(allChannels);
  const currentChannel = useSelector(currentChannelId);
  const contextProps = useContext(AppContext);

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel(id));
  };

  const handleOpenModalForAddChannel = () => {
    dispatch(openModalForAddChannel());
  };

  const handleOpenModalForRemoveChannel = (channel) => () => {
    dispatch(openModalForRemoveChannel(channel));
  };

  const handleOpenModalForRenameChannel = (channel) => () => {
    dispatch(openModalForRenameChannel(channel));
  };

  return (
    <>
      <div className="d-flex mb-2">
        <h5>Channels</h5>
        <button
          onClick={handleOpenModalForAddChannel}
          type="button"
          className="ml-auto p-0 btn btn-link"
          data-toggle="modal"
          data-target="#addingModal"
        >
          Add
        </button>
      </div>
      <ChannelsList
        contextProps={contextProps}
        currentChannelId={currentChannel}
        channels={channels}
        onSelectChannel={handleSelectChannel}
        onOpenModalForRemoveChannel={handleOpenModalForRemoveChannel}
        onOpenModalForRenameChannel={handleOpenModalForRenameChannel}
      />
      <ChannelsModal />
    </>
  );
};

export default Channels;
