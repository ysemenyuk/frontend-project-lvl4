import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allChannels, currentChannelId } from '../selectors/index.js';
import { setCurrentChannel, openModal } from '../store/index.js';

import ChannelsModal from './channelsModals/index.jsx';
import ChannelsList from './ChannelsList.jsx';
import AppContext from '../appContext.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(allChannels);
  const currentChannel = useSelector(currentChannelId);
  const contextProps = useContext(AppContext);

  const setCurrent = (id) => () => {
    dispatch(setCurrentChannel(id));
  };

  const handleModal = (modalTitle, modalData) => () => {
    dispatch(openModal({ modalTitle, modalData }));
  };

  return (
    <>
      <div className="d-flex mb-2">
        <h5>Channels</h5>
        <button
          onClick={handleModal('adding')}
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
        setCurrent={setCurrent}
        handleModal={handleModal}
      />
      <ChannelsModal />
    </>
  );
};

export default Channels;
