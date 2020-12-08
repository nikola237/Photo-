import React, { useEffect, useReducer } from 'react';
//api
import api from '../../api/api';

//components
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import TextField from '@material-ui/core/TextField';

//style
import { Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
        isActive: 1,
        projectId: null,
      };

    case 'EDIT_PROJECT':
      return {
        ...state,
        projectName: action.payload.projectname,
        isActive: action.payload.isActive,
        projectId: action.payload.id,
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
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}

const ActiveProjects = ({ tab }) => {
  const [state, dispatch] = useReducer(activeProjectsReducer, {
    projects: null,
    projectName: '',
    isActive: 1,
    projectId: null,
    isLoading: false,
  });

  const { projects, projectName, isActive, projectId, isLoading } = state;

  console.log(projects, 'iz stejta');
  const getActiveProjects = async () => {
    const response = await api.get('/projects');

    dispatch({ type: 'PROJECTS', payload: response.data.rows });
  };

  useEffect(() => {
    getActiveProjects();
  }, []);

  useEffect(() => {
    if (isLoading) {
      getActiveProjects();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [isLoading]);

  const updateFieldValue = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (projectName === '') {
      console.log('usao');
      return;
    }

    const response = await api.post('/projects', {
      projectname: projectName,

      //za editovanje
      isactive: isActive,
    });
    dispatch({ type: 'IS_LOADING', payload: true });
    dispatch({ type: 'RESET' });
    console.log(response, 'ovo je response');
  };

  const handleEditedProject = async () => {
    const response = await api.put(`/project/${projectId}`, {
      projectname: projectName,
      isActive: isActive,
      projectId: projectId,
    });
    dispatch({ type: 'IS_LOADING', payload: true });
    dispatch({ type: 'RESET' });
  };

  return (
    <Grid container justify="center">
      <Grid item container direction="row" justify="center">
        Create new Project
        <form>
          <TextField
            autoFocus
            name="projectName"
            margin="dense"
            id="project"
            label="add project name"
            type="text"
            fullWidth
            autoComplete="project"
            required
            onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
            value={projectName}
          />
          <Select
            native
            labelId="isActive"
            name="isActive"
            id="select"
            value={isActive}
            onChange={(e) => updateFieldValue(e.target.name, +e.target.value)}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </Select>
          {projectId !== null ? (
            <Button onClick={handleEditedProject}>Submit Edited</Button>
          ) : (
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
          )}
        </form>
      </Grid>
      {projects && (
        <ProjectsTable
          projects={projects}
          tab={tab}
          dispatch={dispatch}
          isLoading={isLoading}
        />
      )}
    </Grid>
  );
};

export default ActiveProjects;
