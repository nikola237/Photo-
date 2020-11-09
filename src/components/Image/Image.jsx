import React from 'react';
import api from '../../api/api';
import { useHistory } from 'react-router-dom';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

const Image = ({ originalname, pathShort, tags, id, filename }) => {
  const { items } = useAdminState();
  const dispatch = useAdminDispatch();
  const history = useHistory();

  // console.log(items);
  const handleDownload = async () => {
    console.log('usao');
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

  const removeItem = () => {
    console.log('usao');
  };

  return (
    <div>
      {items[0]?.message ? (
        <div>{items[0].message}</div>
      ) : (
        <div>
          <p>{`${originalname}`}</p>
          <img
            src={`http://93.86.249.163:3030/items/display/${pathShort}`}
            alt=""
            width="200"
            height="200"
          />
          <p>{`TAGOVI: ${tags}`}</p>
          <button onClick={handleItem}>Edit</button>
          <button onClick={handleDownload}>Download</button>
          <button onClick={removeItem}> Delete</button>
        </div>
      )}
    </div>
  );
};

export default Image;
