import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
//api
import api from '../../api/api';

// components
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import Spinner from '../Spinner/Spinner';

const ActiveItems = ({
  dispatch,
  items,
  type,
  kwords,
  page,
  isLoading,
  setOpen,
}) => {
  const getData = useCallback(() => {
    const source = axios.CancelToken.source();

    const getActiveItems = async () => {
      try {
        const response = await api.post(
          `/items/search?size=10&page=${page}`,
          {
            type: type,
            kwords: kwords,
          },
          { cancelToken: source.token }
        );

        dispatch({ type: 'ITEMS', payload: response.data.rows });
      } catch (error) {
        if (axios.isCancel(error)) {
          throw error;
        }
      }
    };
    getActiveItems();
    return () => {
      source.cancel();
    };
  }, [dispatch, kwords, page, type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  useEffect(() => {
    if (isLoading) {
      getData();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [dispatch, getData, isLoading]);

  return (
    <div>
      Aktivni itemi!!!
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

export default ActiveItems;
