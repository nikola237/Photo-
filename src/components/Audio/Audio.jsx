import React from 'react';
import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import api from '../../api/api';

import { useHistory } from 'react-router-dom';

const Audio = ({ originalname, tags, pathShort, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  const handleDownload = async () => {
    console.log('usao u download');
    const response = await api.get(
      `http://93.86.249.163:3030/items/download/${pathShort}`,
      {
        responseType: 'blob',
      }
    );
    const data = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', `${filename}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
        <div>
          <p>{`${originalname}`}</p>
          <audio controls>
            <source
              src={`http://93.86.249.163:3030/items/display/${pathShort}`}
              type="audio/wav"
            />
          </audio>
          <p>{`TAGOVI: ${tags}`}</p>
          <button onClick={handleItem}>Edit</button>
          <button onClick={handleDownload}>Download</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
};
export default Audio;
