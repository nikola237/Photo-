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
import SettingsIcon from '@material-ui/icons/Settings';
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

  // const itemsList = [
  //   {
  //     // text: 'Dashboard',
  //     icon: (
  //       <Tooltip title="Dashboard" placement="right">
  //         <DashboardIcon />
  //       </Tooltip>
  //     ),

  //     onClick: (index) => {
  //       history.push('/');
  //       setOpen(false);
  //       setSelectedIncon(index);
  //     },
  //   },
  //   {
  //     // text: 'Korisnici',
  //     icon: (
  //       <Tooltip title="Korisnici" placement="right">
  //         <PeopleIcon />
  //       </Tooltip>
  //     ),

  //     onClick: (index) => {
  //       history.push('/users');
  //       setOpen(false);
  //       setSelectedIncon(index);
  //     },
  //   },
  //   {
  //     // text: 'Statistika',
  //     icon: (
  //       <Tooltip title="Statistika" placement="right">
  //         <EqualizerIcon />
  //       </Tooltip>
  //     ),
  //     onClick: (index) => {
  //       history.push('/statistics');
  //       setOpen(false);
  //       setSelectedIncon(index);
  //     },
  //   },
  //   {
  //     // text: 'Dodaj datoteke',
  //     icon: (
  //       <Tooltip title="Dodaj datoteke" placement="right">
  //         <CloudUploadIcon />
  //       </Tooltip>
  //     ),

  //     onClick: (index) => {
  //       history.push('/upload');
  //       setOpen(false);
  //       setSelectedIncon(index);
  //     },
  //   },

  //   {
  //     // text: 'Projekti',
  //     icon: (
  //       <Tooltip title="Projekti" placement="right">
  //         <FolderIcon />
  //       </Tooltip>
  //     ),
  //     onClick: (index) => {
  //       history.push('/projects');
  //       setOpen(false);
  //       setSelectedIncon(index);
  //     },
  //   },
  // ];

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box edge="start" className={classes.menu} onClick={handleClickLogo}>
            <img src={logo} alt="logo" />
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
      {/* <Drawer variant="permanent" className={classes.drawerPaper}>
        <List>
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
      </Drawer> */}
    </div>
  );
};

export default AdminNav;
