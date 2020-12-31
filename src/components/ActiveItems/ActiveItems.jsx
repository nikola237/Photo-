import React, { useEffect, useCallback } from 'react';

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
  extensionFilter,
  editMode,
}) => {
  const getData = useCallback(() => {
    const getActiveItems = async () => {
      try {
        const response = await api.post(
          `/items/search?size=10&page=${page}&ext=.${extensionFilter}`,
          {
            type: type,
            kwords: kwords,
          }
        );
        dispatch({ type: 'ITEMS', payload: response.data.rows });
        dispatch({ type: 'PAGINATION', payload: response.data.totalPages });
      } catch (error) {}
    };
    getActiveItems();
  }, [dispatch, extensionFilter, kwords, page, type]);

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
    <>
      {items ? (
        <>
          {type === 0 && (
            <Image items={items} dispatch={dispatch} editMode={editMode} />
          )}
          {type === 1 && (
            <Video items={items} dispatch={dispatch} editMode={editMode} />
          )}
          {type === 2 && (
            <Audio items={items} dispatch={dispatch} editMode={editMode} />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ActiveItems;
