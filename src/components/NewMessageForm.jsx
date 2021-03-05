import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, addMessage } from './chatSlice.js';

const NewMessageForm = () => {
  const inputValue = useSelector((state) => state.chat.inputValue);
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    // console.log('input', e.target.value);
    dispatch(changeInput(e.target.value));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log('submit', inputValue);
    dispatch(addMessage(inputValue));
  };

  return (
    <div id="new-message-form" className="mt-auto">
      <form noValidate="" className="new-message-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <div className="input-group">
            <input onChange={inputHandler} value={inputValue} name="body" aria-label="body" className="mr-2 form-control" />
            <button aria-label="submit" type="submit" className="btn btn-primary">Submit</button>
            <div className="d-block invalid-feedback">&nbsp;</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
