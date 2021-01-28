import React from 'react';
//styles
import { AppBar, Toolbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useStyles } from './SignInNav.styles';
//logo
import logo from '../../assets/topLogo.png';

const SignInNav = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box edge="start" className={classes.menu}>
          <img src={logo} alt="logo" style={{ width: '200px' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SignInNav;
