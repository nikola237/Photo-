import React, { useEffect, useReducer, useCallback } from 'react';
//api
import api from '../../api/api';

//components
import ProjectsTable from '../ProjectsTable/ProjectsTable';

//style
import { Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
    case 'IS_ACTIVE':
      return {
        ...state,
        isactiveFilter: action.payload,
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
    isActiveProject: false,
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
    isactiveFilter,
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
      `/projects?size=${rowsPerPage}&page=${page}&isactive=${isactiveFilter}`
    );
    dispatch({ type: 'COUNT_PAGINATION', payload: response.data.totalItems });

    dispatch({ type: 'PROJECTS', payload: response.data.rows });
  }, [isactiveFilter, page, rowsPerPage]);

  useEffect(() => {
    getActiveProjects();
  }, [getActiveProjects]);

  useEffect(() => {
    if (isLoading) {
      getActiveProjects();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [getActiveProjects, isLoading]);

  const handleActivivity = (event) => {
    dispatch({ type: 'IS_ACTIVE', payload: event.target.value });
    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: false,
        rowKey: null,
        newProject: false,
      },
    });
  };

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
      <Grid item container justify="center" className={classes.filter}>
        <Select
          native
          labelId="isactiveFilter"
          name="isactiveFilter"
          id="isactiveFilter"
          value={isactiveFilter}
          onChange={handleActivivity}
        >
          <option value={''}>Bez filtera</option>
          <option value={1}>Aktivni</option>
          <option value={0}>Neaktivni</option>
        </Select>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="flex-start"
        className={classes.project}
      >
        <Tooltip title="Dodaj Projekat">
          <AddCircleIcon
            fontSize="large"
            onClick={handleClickOpen}
            className={classes.addProject}
          />
        </Tooltip>
      </Grid>
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
  );
};

export default ActiveProjects;
