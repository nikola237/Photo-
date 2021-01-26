import React, { useEffect, useCallback } from 'react';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

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
  stateSwitch,
  itemById,
}) => {
  const projectsDispatch = useProjectsDispatch();
  const getData = useCallback(() => {
    if (stateSwitch.checkedA) {
      const getItemById = async () => {
        try {
          if (!Number(itemById)) {
            return;
          }
          const response = await api.get(`item/${itemById}`);
          console.log(response.data, 'ovo je response');
          dispatch({ type: 'ITEMS', payload: [response.data] });
        } catch (error) {
          projectsDispatch({
            type: 'SNACKBAR',
            payload: {
              message: 'Nepostojeci ID',
              severity: 'warning',
              open: true,
            },
          });
        }
      };
      getItemById();
    } else {
      const getActiveItems = async () => {
        try {
          const response = await api.post(
            `/items/search?size=24&page=${page}&ext=.${extensionFilter}`,
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
    }
  }, [
    dispatch,
    extensionFilter,
    itemById,
    kwords,
    page,
    stateSwitch.checkedA,
    type,
  ]);

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
