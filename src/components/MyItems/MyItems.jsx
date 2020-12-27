import React, { useEffect, useCallback } from 'react';

//api
import api from '../../api/api';
//components
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import Spinner from '../Spinner/Spinner';

const MyItems = ({
  dispatch,
  items,
  type,
  page,
  error,
  editMode,
  isLoading,
}) => {
  const { id } = JSON.parse(window.localStorage.getItem('user'));

  const getData = useCallback(() => {
    const getItems = async () => {
      try {
        const response = await api.get(
          `/items/user/${id}?size=10&page=${page}&type=${type}`
        );

        dispatch({ type: 'ITEMS', payload: response.data.rows });
        dispatch({ type: 'TOTAL_PAGES', payload: response.data.totalPages });
      } catch (error) {}
    };
    getItems();
  }, [dispatch, id, page, type]);

  useEffect(() => {
    getData();
  }, [dispatch, getData, id, page, type]);
  useEffect(() => {
    if (isLoading) {
      getData();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [dispatch, getData, isLoading]);

  return (
    <div>
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
          {error && <div>{error}</div>}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MyItems;
