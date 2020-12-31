import React, { useState } from 'react';
//authProvider
import { useAuthState } from '../../context/authContext';

//styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import { useStyles } from './SignIn.styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

//components
import SnackbarAuth from '../SnackbarAuth/SnackbarAuth';

const SignIn = () => {
  const classes = useStyles();

  const { login } = useAuthState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    login(email, password);
    setEmail('');
    setPassword('');
  };

  const changeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleVisibility = (event) => {
    setIcon((prev) => !prev);
  };

  return (
    <Grid container className={classes.hero} direction="column">
      <Grid container item className={classes.header}>
        <div className={classes.logoFreska}></div>
        <div className={classes.logoKlett}></div>
        <div className={classes.logoLogos}></div>
      </Grid>
      <Grid align="center" className={classes.content}>
        <Paper elevation={10} className={classes.paper}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <form onSubmit={submitHandler} className={classes.form}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <Box width={300}>
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    autoFocus
                    id="outlined-adornment-email"
                    name="email"
                    type="email"
                    label="Email"
                    onChange={changeHandler}
                    value={email}
                    autoComplete="current-email"
                    variant="outlined"
                    required
                    fullWidth={true}
                  />
                </Box>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <Box width={300}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={icon ? 'password' : 'text'}
                    label="Password"
                    onChange={changeHandler}
                    value={password}
                    autoComplete="current-password"
                    variant="outlined"
                    required
                    fullWidth={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleVisibility}
                          edge="end"
                        >
                          {icon ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Box>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
            <SnackbarAuth />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
