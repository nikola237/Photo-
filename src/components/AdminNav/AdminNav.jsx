import React, { useState } from 'react';
import { useAuthState } from '../../context/authContext/authContext';

import { NavLink, useHistory } from 'react-router-dom';

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
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const AdminNav = () => {
  const { user, logout } = useAuthState();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleDrawer = () => {
    setOpen(true);
  };

  const itemsList = [
    {
      text: 'Dashboard',

      onClick: () => {
        history.push('/');
        setOpen(false);
      },
    },
    {
      text: 'Users',

      onClick: () => {
        history.push('/users');
        setOpen(false);
      },
    },
    {
      text: 'Statistics',

      onClick: () => {
        history.push('/statistic');
        setOpen(false);
      },
    },
    {
      text: 'Upload',

      onClick: () => {
        history.push('/upload');
        setOpen(false);
      },
    },
  ];

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Menu onClick={handleDrawer} />
          {user.firstname}
          <Button onClick={logout}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
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
