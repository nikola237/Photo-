import React from 'react';

const FileUploaded = ({ dispatch, index, name }) => {
  const updateFieldValue = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'title') {
      dispatch({
        type: 'UPDATE_FIELD_TITLE',
        index,
        payload: value,
      });
    } else {
      dispatch({
        type: 'UPDATE_FIELD_TAGS',
        index,
        payload: value,
      });
    }
  };
  console.log(name, 'ovo je name');
  return (
    <div>
      <label>Item name:{name}</label>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={updateFieldValue} name="title" required />
      </div>

      <div>
        <label htmlFor="title">Tags</label>
        <input type="text" onChange={updateFieldValue} name="tags" required />
      </div>
    </div>
  );
};

export default FileUploaded;
