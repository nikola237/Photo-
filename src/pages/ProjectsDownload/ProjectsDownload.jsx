import React, { useEffect, useCallback } from 'react';

//api
import api from '../../api/api';

//router
import { useHistory } from 'react-router-dom';

//provider
import {
  useProjectsState,
  useProjectsDispatch,
} from '../../context/projectsContext.js';

//components
import SearchProjects from '../../components/SearchProjects/SearchProjects';
import ProjectsRadioButtons from '../../components/ProjectsRadioButtons/ProjectsRadioButtons';
import Spinner from '../../components/Spinner/Spinner';

//styles
import { Button, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

const ProjectsDownload = () => {
  const { itemInfo, kwords, type, projects, projectId } = useProjectsState();
  const dispatch = useProjectsDispatch();
  const history = useHistory();

  const { filename, pathShort } = itemInfo;

  const handleDownload = async () => {
    const response = await api.get(
      `/items/download/${pathShort}/${projectId}`,
      {
        responseType: 'blob',
      }
    );
    console.log(response, 'iz download klika');
    const data = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', `${filename}`);

    link.click();
    link.remove();
    history.push('/');
  };

  const getData = useCallback(() => {
    const getActiveProjects = async () => {
      const response = await api.post('/projects/search?size=200&page=1', {
        kword: kwords,
        isactive: type,
      });

      dispatch({ type: 'PROJECTS', payload: response.data.rows });
    };
    getActiveProjects();
  }, [dispatch, kwords, type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [getData]);

  const handleChangeCheckbox = (event) => {
    dispatch({ type: 'PROJECT_ID', payload: +event.target.value });
  };
  return (
    <Grid container justify="center">
      <Grid container item justify="center">
        <SearchProjects />
      </Grid>
      <Grid container item justify="center">
        <ProjectsRadioButtons />
      </Grid>
      <Grid>
        {projects ? (
          projects.map((project) => {
            if (projects[0]?.message) {
              return (
                <div key={1}>
                  <Paper>{project.message}</Paper>
                </div>
              );
            } else {
              return (
                <Paper key={project.id}>
                  <Checkbox
                    value={project.id}
                    checked={project.checked}
                    onChange={handleChangeCheckbox}
                    color="primary"
                    type="checkbox"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  {project.projectname}1
                </Paper>
              );
            }
          })
        ) : (
          <Spinner />
        )}
      </Grid>
      <Grid>
        {projects ? <Button onClick={handleDownload}>Submit</Button> : null}
      </Grid>
    </Grid>
  );
};

export default ProjectsDownload;
