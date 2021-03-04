import React from 'react';

const NewMessageForm = () => {
  const inputHandler = (e) => {
    console.log('input', e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submit', e.target.value);
  };

  return (
    <div id="new-message-form" className="mt-auto">
      <form noValidate="" className="new-message-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <div className="input-group">
            <input onChange={inputHandler} name="body" aria-label="body" className="mr-2 form-control" value="" />
            <button aria-label="submit" type="submit" className="btn btn-primary">Submit</button>
            <div className="d-block invalid-feedback">&nbsp;</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
