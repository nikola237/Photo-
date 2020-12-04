import React, { useEffect } from 'react';
import axios from 'axios';
//api
import api from '../../api/api';
//components
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import Spinner from '../Spinner/Spinner';

const MyItems = ({ dispatch, items, type, page }) => {
  const { id } = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getItems = async () => {
      try {
        const response = await api.get(
          `/items/user/${id}?size=10&page=${page}&type=${type}`,
          {
            cancelToken: source.token,
          }
        );

        dispatch({ type: 'ITEMS', payload: response.data.rows });
        dispatch({ type: 'TOTAL_PAGES', payload: response.data.totalPages });
      } catch (error) {
        if (axios.isCancel(error)) {
          throw error;
        }
      }
    };
    getItems();
    return () => {
      source.cancel();
    };
  }, [dispatch, id, page, type]);

  return (
    <div>
      {items ? (
        <>
          {type === 0 && <Image items={items} dispatch={dispatch} />}
          {type === 1 && <Video items={items} dispatch={dispatch} />}
          {type === 2 && <Audio items={items} dispatch={dispatch} />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MyItems;
