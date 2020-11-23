import React from 'react';
import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import { useHistory } from 'react-router-dom';

import { handleDownloadItem, removeItem } from '../utils.js';

const Video = ({ pathShort, originalname, tags, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  const handleItem = () => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    history.push(`/edit/${id}`);
  };

  console.log('VIDEO');
  return (
    <div>
      {items[0]?.message ? (
        <div>{items[0].message}</div>
      ) : (
        <div onContextMenu={(e) => e.preventDefault()}>
          <p>{`${originalname}`}</p>
          <video width="320" height="240" controlsList="nodownload" controls>
            <source
              src={`http://93.86.249.163:3030/items/display/${pathShort}`}
              type="video/mp4"
            />
          </video>
          <p>{`TAGOVI: ${tags}`}</p>
          <button onClick={handleItem}>Edit</button>
          <button onClick={() => handleDownloadItem(pathShort, filename)}>
            Download
          </button>
          <button onClick={() => removeItem()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Video;
