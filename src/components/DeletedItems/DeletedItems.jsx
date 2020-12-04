import React, { useEffect, useCallback } from 'react';
import axios from 'axios';

//api
import api from '../../api/api';

// components
import Image from '../../components/Image/Image';
import Video from '../../components/Video/Video';
import Audio from '../../components/Audio/Audio';
import Spinner from '../Spinner/Spinner';

const DeletedItems = ({
  dispatch,
  items,
  type,
  kwords,
  page,
  tab,
  isLoading,
}) => {
  const getData = useCallback(() => {
    async function getRemovedItems() {
      const response = await api.post(
        `/items/remove/search?size=10&page=${page}`,
        {
          type: type,
          kwords: kwords,
        }
      );

      dispatch({ type: 'ITEMS', payload: response.data.rows });
    }
    getRemovedItems();
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
      Obrisani itemi
      {items ? (
        <>
          {type === 0 && <Image items={items} dispatch={dispatch} tab={tab} />}
          {type === 1 && <Video items={items} dispatch={dispatch} tab={tab} />}
          {type === 2 && <Audio items={items} dispatch={dispatch} tab={tab} />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default DeletedItems;
