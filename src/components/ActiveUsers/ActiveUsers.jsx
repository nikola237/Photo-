import React, { useState } from 'react';

//components
import UsersTable from '../../components/UsersTable/UsersTable';

//styles
import { Grid } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './ActiveUsers.styles';

const ActiveUsers = ({
  dispatch,
  firstname,
  lastname,
  username,
  email,
  password,
  role,
  isLoading,
  users,
  tab,
}) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
    newUser: false,
  });
  const classes = useStyles();

  const handleClickOpen = () => {
    const createNewUser = [
      {
        id: Math.floor(Math.random() * 1000),
      },
      ...users,
    ];
    console.log(createNewUser.id, 'ovo je NU');
    setInEditMode({
      status: true,
      rowKey: createNewUser[0].id,
      newUser: true,
    });
    dispatch({ type: 'USERS', payload: createNewUser });
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item container direction="row">
        <Tooltip title="Dodaj Korisnika">
          <PersonAddIcon fontSize="large" onClick={handleClickOpen} />
        </Tooltip>
      </Grid>

      <Grid item container>
        <UsersTable
          dispatch={dispatch}
          isLoading={isLoading}
          users={users}
          tab={tab}
          firstname={firstname}
          lastname={lastname}
          username={username}
          email={email}
          role={role}
          password={password}
          inEditMode={inEditMode}
          setInEditMode={setInEditMode}
        />
      </Grid>
    </Grid>
  );
};

export default ActiveUsers;
