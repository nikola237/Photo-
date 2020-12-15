import React, { useState, useEffect, useReducer } from 'react';
//api
import api from '../../api/api';
//components
import RemovedProjectsTable from '../RemovedProjectsTable/RemovedProjectsTable';

function RemovedProjectsReducer(state, action) {
  console.log(action.payload, 'iz obrisanih');
  switch (action.type) {
    case 'REMOVED_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'PAGE_PAGINATION':
      return {
        ...state,

        page: action.payload,
      };
    case 'ROWS_PAGE_PAGINATION':
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    case 'COUNT_PAGINATION':
      return {
        ...state,
        count: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

const RemovedProjects = ({ tab }) => {
  const [state, dispatch] = useReducer(RemovedProjectsReducer, {
    projects: null,
    isLoading: false,
    page: 1,
    rowsPerPage: 5,
    count: 0,
  });

  const { projects, isLoading, page, rowsPerPage, count } = state;

  const getRemovedProjects = async () => {
    const response = await api.get('/projects/remove/');

    dispatch({ type: 'REMOVED_PROJECTS', payload: response.data.rows });
    dispatch({ type: 'COUNT_PAGINATION', payload: response.data.totalItems });
  };

  useEffect(() => {
    getRemovedProjects();
  }, []);

  useEffect(() => {
    if (isLoading) {
      getRemovedProjects();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [isLoading]);

  return (
    <div>
      {projects && (
        <RemovedProjectsTable
          projects={projects}
          dispatch={dispatch}
          page={page}
          rowsPerPage={rowsPerPage}
          count={count}
        />
      )}
    </div>
  );
};

export default RemovedProjects;
