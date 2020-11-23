import React from 'react';

import { useAdminState } from '../../context/authContext/adminContext/adminContext';

const EditItem = () => {
  const { edit } = useAdminState();
  console.log(edit, 'ovo je edit!!!');

  const [currentItem] = edit;
  const { pathShort, tags, originalname, type } = currentItem;

  const changeHandler = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {type === '0' ? (
        <img
          src={`http://93.86.249.163:3030/items/display/${pathShort}`}
          alt=""
          width="200"
          height="200"
        />
      ) : type === '1' ? (
        <video width="320" height="240" controls>
          <source
            src={`http://93.86.249.163:3030/items/display/${pathShort}`}
            type="video/mp4"
          />
        </video>
      ) : (
        <audio controls>
          <source
            src={`http://93.86.249.163:3030/items/display/${pathShort}`}
            type="audio/wav"
          />
        </audio>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input onChange={changeHandler} value={tags} type="text" />
        </div>
        <div>
          <input onChange={changeHandler} value={originalname} type="text" />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default EditItem;
