import React, { useCallback, useEffect } from 'react';

import Search from '../../components/Search/Search';
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';
import api from '../../api/api';

const Admin = () => {
  const { items, type, kwords } = useAdminState();
  const dispatch = useAdminDispatch();

  console.log(items, type, 'ovo je items');

  const getItems = useCallback(async () => {
    const response = await api.post('/items/search', {
      type: type,
      kwords: kwords,
    });

    dispatch({ type: 'ITEMS', payload: response.data.rows });
  }, [dispatch, kwords, type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getItems();
    }, 1000);

    return () => {
      console.log('klirovao');
      clearTimeout(timeout);
    };
  }, [getItems]);

  return (
    <div>
      <Search />

      {type === 0
        ? items.map((item) => <Image key={item.id ? item.id : 1} {...item} />)
        : type === 1
        ? items.map((item) => <Video key={item.id ? item.id : 1} {...item} />)
        : items.map((item) => <Audio key={item.id ? item.id : 1} {...item} />)}
    </div>
  );
};

export default Admin;
