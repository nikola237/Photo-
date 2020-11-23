import React from 'react';
import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import { useHistory } from 'react-router-dom';
import { handleDownloadItem, removeItem } from '../utils';

const Audio = ({ originalname, tags, pathShort, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  const handleItem = () => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    history.push(`/edit/${id}`);
  };
  console.log('AUDIO');
  return (
    <div>
      {items[0]?.message ? (
        <div>{items[0].message}</div>
      ) : (
        <div onContextMenu={(e) => e.preventDefault()}>
          <p>{`${originalname}`}</p>
          <audio controlsList="nodownload" controls>
            <source
              src={`http://93.86.249.163:3030/items/display/${pathShort}`}
              type="audio/wav"
            />
          </audio>
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
export default Audio;
