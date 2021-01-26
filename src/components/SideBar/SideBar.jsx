import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const [selectedIcon, setSelectedIncon] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  const itemsList = [
    {
      // text: 'Dashboard',
      icon: (
        <Tooltip title="Dashboard" placement="right">
          {/* <DashboardIcon /> */}
          <img
            src={dashboard}
            alt="dashboard"
            style={{
              width: '38px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/');

        setSelectedIncon(index);
      },
    },
    {
      // text: 'Korisnici',
      icon: (
        <Tooltip title="Korisnici" placement="right">
          {/* <PeopleIcon /> */}
          <img
            src={users}
            alt="users"
            style={{
              width: '38px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/users');

        setSelectedIncon(index);
      },
    },
    {
      // text: 'Statistika',
      icon: (
        <Tooltip title="Statistika" placement="right">
          {/* <EqualizerIcon /> */}
          <img
            src={stats}
            alt="stats"
            style={{
              width: '38px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/statistics');

        setSelectedIncon(index);
      },
    },
    {
      // text: 'Dodaj datoteke',
      icon: (
        <Tooltip title="Dodaj datoteke" placement="right">
          {/* <CloudUploadIcon /> */}
          <img
            src={upload}
            alt="upload"
            style={{
              width: '38px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/upload');

        setSelectedIncon(index);
      },
    },

    {
      // text: 'Projekti',
      icon: (
        <Tooltip title="Projekti" placement="right">
          {/* <FolderIcon /> */}
          <img
            src={projects}
            alt="projects"
            style={{
              width: '38px',
              height: '38px',
              backgroundPosition: 'center',
            }}
          />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/projects');

        setSelectedIncon(index);
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
              selected={index === selectedIcon}
              style={
                selectedIcon === index
                  ? { backgroundColor: `rgba(0,0,0, 0.3)` }
                  : null
              }
            >
              {icon && (
                <ListItemIcon
                  style={selectedIcon === index ? { color: 'white' } : null}
                >
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default SideBar;
