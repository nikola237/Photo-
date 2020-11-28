import React, { useState } from 'react';
import { useAuthState } from '../../context/authContext/authContext';

import { useHistory } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Menu } from '@material-ui/icons';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useStyles } from './AdminNav.styles';

const AdminNav = () => {
  const { user, logout } = useAuthState();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const itemsList = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,

      onClick: () => {
        history.push('/');
        setOpen(false);
      },
    },
    {
      text: 'Users',
      icon: <PeopleIcon />,

      onClick: () => {
        history.push('/users');
        setOpen(false);
      },
    },
    {
      text: 'Statistics',
      icon: <EqualizerIcon />,
      onClick: () => {
        history.push('/statistic');
        setOpen(false);
      },
    },
    {
      text: 'Upload',
      icon: <CloudUploadIcon />,
      onClick: () => {
        history.push('/upload');
        setOpen(false);
      },
    },
  ];

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menu}
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>

          <Typography className={classes.user}>{user.firstname}</Typography>
          <Button variant="contained" color="secondary" onClick={logout}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <Drawer
        variant="permanent"
        onClose={() => setOpen(false)}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default AdminNav;
