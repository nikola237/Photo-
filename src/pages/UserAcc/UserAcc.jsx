import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

//api
import api from '../../api/api';

//components
import Footer from '../../components/Footer/Footer';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useStyles } from './UserAcc.styles';

export function accReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };

    case 'EDIT_USER':
      return {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type} `);
    }
  }
}
const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  isLoading: false,
};

const UserAcc = () => {
  const [user] = useState(
    JSON.parse(window.localStorage.getItem('user')) || null
  );
  const [state, dispatch] = useReducer(accReducer, INITIAL_STATE);

  const { firstname, lastname, username, email, password, isLoading } = state;

  const projectsDispatch = useProjectsDispatch();
  const classes = useStyles();
  const history = useHistory();

  const updateFieldValue = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };
  const getData = useCallback(() => {
    async function getUser() {
      const response = await api.get(`/user/${user.id}`);

      dispatch({ type: 'EDIT_USER', payload: response.data });
    }
    getUser();
  }, [user.id]);

  useEffect(() => {
    getData();
  }, [getData, user.id]);

  useEffect(() => {
    if (isLoading) {
      getData();
    }
  }, [getData, isLoading]);

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstname === '' ||
      lastname === '' ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Bez praznih polja',
          severity: 'success',
          open: true,
        },
      });
      return;
    }
    const response = await api.put(`/user/${user.id}`, {
      firstname,
      lastname,
      username,
      email,
      password,
    });
    if (response.status === 200) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste izmenili korisnika',
          severity: 'success',
          open: true,
        },
      });
      dispatch({ type: 'IS_LOADING', payload: true });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      className={classes.itemContainer}
      justify="center"
    >
      <Grid container item justify="center">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) =>
                    updateFieldValue(e.target.name, e.target.value)
                  }
                  variant="outlined"
                  autoFocus
                  fullWidth
                  id="firsname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  value={firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) =>
                    updateFieldValue(e.target.name, e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) =>
                    updateFieldValue(e.target.name, e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  autoComplete="username"
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) =>
                    updateFieldValue(e.target.name, e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) =>
                    updateFieldValue(e.target.name, e.target.value)
                  }
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password || ''}
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </form>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.buttons}
              >
                Sacuvaj
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.buttons}
                onClick={handleCancel}
              >
                Odustani
              </Button>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Grid>
    </Container>
  );
};

export default UserAcc;
