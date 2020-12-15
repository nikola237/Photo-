import React, { useEffect, useState } from 'react';

import { useAuthState } from '../../context/authContext';

//styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './SignIn.styles';

const SignIn = () => {
  const classes = useStyles();

  const { login, status } = useAuthState();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <div>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email adress"
              onChange={changeHandler}
              value={email}
              autoComplete="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="password"
              name="password"
              type={icon ? 'password' : 'text'}
              label="Password"
              onChange={changeHandler}
              value={password}
              autoComplete="current-password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
            <IconButton onClick={handleVisibility}>
              {icon ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {status}
      </div>
    </Container>
  );
};

export default SignIn;
