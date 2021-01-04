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
import Footer from '../../components/Footer/Footer';

//styles
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useStyles } from './ProjectsDownload.styles';

const ProjectsDownload = () => {
  const { itemInfo, kwords, type, projects, projectId } = useProjectsState();
  const dispatch = useProjectsDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { filename, pathShort } = itemInfo;

  const handleDownload = async () => {
    if (!projectId) {
      return;
    }
    const response = await api.get(
      `/items/download/${pathShort}/${projectId}`,
      {
        responseType: 'blob',
      }
    );
    if (response) {
      dispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste preuzeli item',
          severity: 'success',
          open: true,
        },
      });
    }
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

  const handleToggle = (value) => () => {
    dispatch({ type: 'PROJECT_ID', payload: +value });
  };

  return (
    <Container maxWidth="xl" className={classes.itemContainer} justify="center">
      <Grid container item justify="center" className={classes.searchContainer}>
        <SearchProjects />
      </Grid>
      <Grid container item justify="center">
        <ProjectsRadioButtons />
      </Grid>
      <Grid item container direction="column" justify="center">
        {projects ? (
          <List className={classes.root}>
            {projects &&
              projects.map((project, index) => {
                const labelId = `checkbox-list-label-${project.projectname}`;

                return (
                  <ListItem
                    key={project.id}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(project.id, index)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={project.checked}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.content}
                      id={labelId}
                      primary={`${project.projectname},  ID: ${project.id}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={handleDownload}
                      >
                        <CheckCircleIcon style={{ color: '#64b5f6' }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        ) : (
          <Spinner />
        )}
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </Container>
  );
};

export default ProjectsDownload;
