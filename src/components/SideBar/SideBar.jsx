import React from 'react';
import { useHistory } from 'react-router-dom';

//provider
import {
  useProjectsDispatch,
  useProjectsState,
} from '../../context/projectsContext';

//styles
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

import dashboard from '../../assets/output-onlinepngtools.png';
import projects from '../../assets/output-onlinepngtools (3).png';
import upload from '../../assets/output-onlinepngtools (2).png';
import stats from '../../assets/output-onlinepngtools (1).png';
import users from '../../assets/output-onlinepngtools (4).png';

import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import { useStyles } from './SideBar.styles';

const SideBar = () => {
  // const [selectedIcon, setSelectedIncon] = useState(0);
  const projectsDispatch = useProjectsDispatch();
  const { sideBar } = useProjectsState();
  const classes = useStyles();
  const history = useHistory();
  const itemsList = [
    {
      icon: (
        <Tooltip title="Dashboard" placement="right">
          <img
            src={dashboard}
            alt="dashboard"
            style={{
              width: '47px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/');
        console.log('usao u ', index);
        projectsDispatch({ type: 'SIDEBAR', payload: index });
      },
    },
    {
      icon: (
        <Tooltip title="Korisnici" placement="right">
          <img
            src={users}
            alt="users"
            style={{
              width: '47px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/users');
        console.log('usao u ', index);
        projectsDispatch({ type: 'SIDEBAR', payload: index });
      },
    },
    {
      icon: (
        <Tooltip title="Statistika" placement="right">
          <img
            src={stats}
            alt="stats"
            style={{
              width: '47px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/statistics');
        console.log('usao u ', index);
        projectsDispatch({ type: 'SIDEBAR', payload: index });
      },
    },
    {
      icon: (
        <Tooltip title="Dodaj datoteke" placement="right">
          <img
            src={upload}
            alt="upload"
            style={{
              width: '47px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/upload');
        console.log('usao u ', index);
        projectsDispatch({ type: 'SIDEBAR', payload: index });
      },
    },

    {
      icon: (
        <Tooltip title="Projekti" placement="right">
          <img
            src={projects}
            alt="projects"
            style={{
              width: '47px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/projects');
        console.log('usao u ', index);
        projectsDispatch({ type: 'SIDEBAR', payload: index });
      },
    },
  ];
  return (
    <Grid container justify="center" style={{ position: 'relative' }}>
      <List className={classes.bar}>
        <div className={classes.background}></div>
        <div className={classes.backgroundTwo}></div>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem
              button
              key={index}
              onClick={() => onClick(index)}
              selected={index === sideBar}
              style={
                sideBar === index
                  ? { backgroundColor: `rgba(0,0,0, 0.3)` }
                  : null
              }
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default SideBar;
