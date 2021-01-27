import React, { useReducer } from 'react';

//components
import DeletedUsers from '../../components/DeletedUsers/DeletedUsers';
import AtiveUsers from '../../components/ActiveUsers/ActiveUsers';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import SideBar from '../../components/SideBar/SideBar';

//styles
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useStyles } from './Users.styles';
import Container from '@material-ui/core/Container';

function usersReducer(state, action) {
  switch (action.type) {
    case 'USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RESET':
      return {
        ...state,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        role: 0,
      };
    case 'EDIT_USER':
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'TAB':
      return {
        ...state,
        tab: action.payload,
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
  role: 0,
  isLoading: false,
  users: null,
  tab: 0,
};

const Users = () => {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);

  const {
    firstname,
    lastname,
    username,
    email,
    password,
    role,
    isLoading,
    users,
    tab,
  } = state;

  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    dispatch({ type: 'TAB', payload: newValue });
  };

  return (
    <Container maxWidth="xl" className={classes.itemContainer} justify="center">
      <div className={classes.sidebarWrapper}>
        <SideBar />
      </div>
      <Grid className={classes.wrapper}>
        <Grid item container justify="flex-end">
          <Tabs
            indicatorColor="secondary"
            className={classes.tabs}
            value={tab}
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
          >
            <Tab label="Активни корисници" />
            <Tab label="Обрисани корисници" />
          </Tabs>
        </Grid>
        <Grid item container className={classes.content}>
          {tab === 0 && (
            <AtiveUsers
              dispatch={dispatch}
              users={users}
              firstname={firstname}
              lastname={lastname}
              username={username}
              email={email}
              password={password}
              role={role}
              isLoading={isLoading}
            />
          )}
          {tab === 1 && (
            <DeletedUsers
              dispatch={dispatch}
              users={users}
              isLoading={isLoading}
            />
          )}
        </Grid>
        <Grid item container className={classes.footer}></Grid>
      </Grid>
      <SnackbarAlert />
    </Container>
  );
};

export default Users;
