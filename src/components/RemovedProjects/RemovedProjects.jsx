import React, { useState, useEffect, useReducer } from 'react';
//api
import api from '../../api/api';
//components
import ProjectsTable from '../ProjectsTable/ProjectsTable';

function RemovedProjectsReducer(state, action) {
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
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

const RemovedProjects = () => {
  const [state, dispatch] = useReducer(RemovedProjectsReducer, {
    projects: null,
    isLoading: false,
  });

  const { projects, isLoading } = state;

  const getRemovedProjects = async () => {
    const response = await api.get('/projects/remove/');

    dispatch({ type: 'REMOVED_PROJECTS', payload: response.data.rows });
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
      {projects && <ProjectsTable projects={projects} dispatch={dispatch} />}
    </div>
  );
};

export default RemovedProjects;
