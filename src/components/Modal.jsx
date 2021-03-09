import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../store/index.js';
import { modalSelector } from '../selectors/index.js';

const Modal = () => {
  const dispatch = useDispatch();
  const { modalTitle, modalData } = useSelector(modalSelector);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button onClick={closeModalHandler} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{modalData}</p>
          </div>
          <div className="modal-footer">
            <button onClick={closeModalHandler} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
