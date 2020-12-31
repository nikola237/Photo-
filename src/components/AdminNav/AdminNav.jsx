import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//auth
import { useAuthState } from '../../context/authContext';

//styles
import {
  AppBar,
  Toolbar,
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
import FolderIcon from '@material-ui/icons/Folder';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { useStyles } from './AdminNav.styles';

const AdminNav = () => {
  const { user, logout } = useAuthState();
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIncon] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = () => {
    history.push('');
    logout();
  };

  const handleUserAcc = () => {
    history.push('/acc');
  };

  const itemsList = [
    {
      text: 'Dashboard',
      icon: (
        <Tooltip title="Dashboard" placement="right">
          <DashboardIcon />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/');
        setOpen(false);
        setSelectedIncon(index);
      },
    },
    {
      text: 'Korisnici',
      icon: (
        <Tooltip title="Korisnici" placement="right">
          <PeopleIcon />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/users');
        setOpen(false);
        setSelectedIncon(index);
      },
    },
    {
      text: 'Statistika',
      icon: (
        <Tooltip title="Statistika" placement="right">
          <EqualizerIcon />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/statistics');
        setOpen(false);
        setSelectedIncon(index);
      },
    },
    {
      text: 'Dodaj datoteke',
      icon: (
        <Tooltip title="Dodaj datoteke" placement="right">
          <CloudUploadIcon />
        </Tooltip>
      ),

      onClick: (index) => {
        history.push('/upload');
        setOpen(false);
        setSelectedIncon(index);
      },
    },

    {
      text: 'Projekti',
      icon: (
        <Tooltip title="Projekti" placement="right">
          <FolderIcon />
        </Tooltip>
      ),
      onClick: (index) => {
        history.push('/projects');
        setOpen(false);
        setSelectedIncon(index);
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
          <Box
            edge="start"
            className={classes.menu}

            // startIcon={<Menu />}
          >
            <IconButton onClick={handleDrawerOpen}>
              <Menu className={classes.menuButton} />
            </IconButton>
          </Box>

          <Button
            startIcon={<SettingsIcon />}
            className={classes.user}
            onClick={handleUserAcc}
          >
            {user.firstname}
          </Button>
          <Button
            variant="contained"
            className={classes.logout}
            onClick={handleLogout}
            startIcon={<PowerSettingsNewIcon />}
          >
            Logout
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
              <ListItem
                button
                key={text}
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
      </Drawer>
    </div>
  );
};

export default AdminNav;
