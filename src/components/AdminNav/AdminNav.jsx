import React from 'react';
import { useHistory } from 'react-router-dom';

//logo
import logo from '../../assets/topLogo.png';

//auth
import { useAuthState } from '../../context/authContext';

//styles
import { AppBar, Toolbar, Button } from '@material-ui/core';

// import FolderIcon from '@material-ui/icons/Folder';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';
// import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { useStyles } from './AdminNav.styles';

const AdminNav = () => {
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

  const handleClickLogo = () => {
    history.push('/');
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box edge="start" className={classes.menu} onClick={handleClickLogo}>
            <img src={logo} alt="logo" style={{ width: '200px' }} />
          </Box>

          <Button
            startIcon={<PersonIcon />}
            className={classes.user}
            onClick={handleUserAcc}
            variant="outlined"
          >
            {user.firstname}
          </Button>
          <Button
            variant="outlined"
            className={classes.logout}
            onClick={handleLogout}
            startIcon={<PowerSettingsNewIcon />}
          >
            Одјави се
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default AdminNav;
