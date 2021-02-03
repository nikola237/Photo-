import React, { useEffect, useReducer, useCallback } from 'react';
//api
import api from '../../api/api';

//components
import ProjectsTable from '../ProjectsTable/ProjectsTable';

//style
import { Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './ActiveProjects.styles';

function activeProjectsReducer(state, action) {
  switch (action.type) {
    case 'PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RESET':
      return {
        ...state,
        projectName: '',
        isactive: false,
      };
    case 'IN_EDIT_MODE':
      return {
        ...state,
        editMode: {
          status: action.payload.status,
          rowKey: action.payload.rowKey,
          newProject: action.payload.newProject,
        },
      };

    case 'EDIT_PROJECT':
      return {
        ...state,
        projectname: action.payload.projectname,
        isActiveProject: action.payload.isActiveProject,
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
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

const ActiveProjects = () => {
  const [state, dispatch] = useReducer(activeProjectsReducer, {
    projects: null,
    projectname: '',
    isactiveFilter: '',
    projectId: null,
    isLoading: false,
    page: 1,
    rowsPerPage: 5,
    count: 0,
    editMode: {
      status: false,
      rowKey: null,
      newProject: false,
    },
  });

  const {
    projects,
    projectname,
    isActiveProject,
    isLoading,
    page,
    rowsPerPage,
    count,
    editMode,
  } = state;
  const classes = useStyles();
  const getActiveProjects = useCallback(async () => {
    const response = await api.get(
      `/projects?size=${rowsPerPage}&page=${page}`
    );
    dispatch({ type: 'COUNT_PAGINATION', payload: response.data.totalItems });

    dispatch({ type: 'PROJECTS', payload: response.data.rows });
  }, [page, rowsPerPage]);

  useEffect(() => {
    getActiveProjects();
  }, [getActiveProjects]);

  useEffect(() => {
    if (isLoading) {
      getActiveProjects();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [getActiveProjects, isLoading]);

  const handleClickOpen = () => {
    const createNewProject = [
      {
        id: Math.floor(Math.random() * 1000),
      },
      ...projects,
    ];

    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: true,
        rowKey: createNewProject[0].id,
        newProject: true,
      },
    });
    dispatch({ type: 'PROJECTS', payload: createNewProject });
  };

  return (
    <Grid container justify="center">
      <Grid item container justify="space-between" className={classes.filter}>
        <Tooltip title="Додај пројекат">
          <div className={classes.addProject} onClick={handleClickOpen}></div>
        </Tooltip>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="flex-start"
        className={classes.project}
      >
        <div className={classes.tableBackground1}></div>
        <div className={classes.tableBackground2}></div>

        {projects && (
          <ProjectsTable
            projects={projects}
            dispatch={dispatch}
            page={page}
            rowsPerPage={rowsPerPage}
            count={count}
            editMode={editMode}
            projectname={projectname}
            isActiveProject={isActiveProject}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ActiveProjects;
