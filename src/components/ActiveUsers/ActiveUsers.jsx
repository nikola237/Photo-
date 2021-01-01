import React, { useState } from 'react';

//components
import UsersTable from '../../components/UsersTable/UsersTable';

//styles
import { Grid } from '@material-ui/core';
<<<<<<< HEAD
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './ActiveUsers.styles';

=======
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
 import { useStyles } from './ActiveUsers.styles';
import AddIcon from '@material-ui/icons/Add';
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
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
<<<<<<< HEAD
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
    newUser: false,
  });
  const classes = useStyles();
=======
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [id, setId] = useState(null);
   const classes = useStyles();
>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d

  const handleClickOpen = () => {
    if (inEditMode.status) {
      return;
    }
    const createNewUser = [
      {
        id: Math.floor(Math.random() * 5000),
      },
      ...users,
    ];
    setInEditMode({
      status: true,
      rowKey: createNewUser[0].id,
      newUser: true,
    });
    dispatch({ type: 'USERS', payload: createNewUser });
  };

  return (
<<<<<<< HEAD
    <Grid container direction="column" alignItems="flex-start" spacing={3}>
      <Grid item container direction="row">
        <Tooltip title="Dodaj Korisnika">
          <PersonAddIcon
            fontSize="large"
            onClick={handleClickOpen}
            className={classes.addUser}
          />
        </Tooltip>
      </Grid>
      <Grid container item className={classes.content}>
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
=======
    <Grid container direction="column" alignItems='flex-start'>
      <Dialog
      className={classes.dialog}
        disableBackdropClick={true}
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {showInput ?
        <DialogTitle id="form-dialog-title">Kreiraj Korisnika</DialogTitle>:
        <DialogTitle id="form-dialog-title">Izmeni Korisnika</DialogTitle>}
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="firstname"
              margin="dense"
              id="first name"
              label="Ime"
              type="text"
              fullWidth
              autoComplete="first name"
              required
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={firstname}
            />
            <TextField
              name="lastname"
              margin="dense"
              id="last name"
              label="Prezime"
              type="text"
              fullWidth
              autoComplete="last name"
              required
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={lastname}
            />
            <TextField
              name="username"
              margin="dense"
              id="username"
              label="Korisničko ime"
              type="username"
              fullWidth
              autoComplete="username"
              required
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={username}
            />
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="email"
              type="email"
              fullWidth
              autoComplete="email"
              required
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={email}
            />
            {showInput ? (
              <TextField
                name="password"
                margin="dense"
                id="password"
                label="Lozinka"
                type="password"
                fullWidth
                autoComplete="password"
                required
                onChange={(e) =>
                  updateFieldValue(e.target.name, e.target.value)
                }
                value={password}
              />
            ) : null}
            <Select
              native
              labelId="User role"
              name="role"
              id="select"
              value={role}
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
            >
              <option value={0}>Korisnik</option>
              <option value={1}>Urednik</option>
              <option value={2}>Administrator</option>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm} color="primary">
            Odustani
          </Button>
          {showInput ? (
            <Button onClick={handleSubmit} color="primary">
              Sačuvaj
            </Button>
          ) : (
            <Button onClick={handleEditedUser}>Sačuvaj Izmene</Button>
          )}
        </DialogActions>
      </Dialog>
      <Button color="primary" className={classes.buttonCreate} onClick={handleClickOpen}>
       {/* <AddIcon/> */}
        Kreiraj Korisnika
      </Button> 
      <UsersTable
        dispatch={dispatch}
        setOpen={setOpen}
        setShowInput={setShowInput}
        setId={setId}
        isLoading={isLoading}
        users={users}
        tab={tab}
      />


>>>>>>> 77df1eadbaa841cee647e3e538f82303d9ad738d
    </Grid>
  );
};

export default ActiveUsers;
