import React from 'react';
import { useHistory } from 'react-router-dom';

//auth
import { useAuthState } from '../../context/authContext';

//styles
import { AppBar, Toolbar, Button } from '@material-ui/core';
import clsx from 'clsx';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsIcon from '@material-ui/icons/Settings';
import Box from '@material-ui/core/Box';
import { useStyles } from './UserNav.styles';

const UserNav = () => {
  const { user, logout } = useAuthState();

  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    history.push('');
    logout();
  };
  const handleUserAcc = () => {
    history.push('/acc');
  };
  return (
    <div>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          <Box edge="start" className={classes.menu}></Box>

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
    </div>
  );
};

export default UserNav;
