import React, { useState } from 'react';
//api
import api from '../../api/api';

//components
import UsersTable from '../../components/UsersTable/UsersTable';

//styles
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
// import { useStyles } from './ActiveUsers.styles';

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
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [id, setId] = useState(null);
  // const classes = useStyles();

  const handleClickOpen = () => {
    setShowInput(true);
    setOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/users', {
      firstname,
      lastname,
      username,
      email,
      password,
      role,
    });
    setOpen(false);
  };

  const updateFieldValue = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };
  const resetForm = () => {
    setOpen(false);
    dispatch({ type: 'RESET' });
  };

  const handleEditedUser = async () => {
    const response = await api.put(`/user/${id}`, {
      firstname,
      lastname,
      username,
      email,
      password,
      role,
    });
    dispatch({ type: 'IS_LOADING', payload: true });
    // console.log(response, 'Response iz edita');
    setOpen(false);
  };
  return (
    <Grid container direction="column">
      <Dialog
        disableBackdropClick={true}
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="firstname"
              margin="dense"
              id="first name"
              label="first name"
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
              label="last name"
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
              label="username"
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
                label="password"
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
              <option value={0}>User</option>
              <option value={1}>Editor</option>
              <option value={2}>Admin</option>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm} color="primary">
            Cancel
          </Button>
          {showInput ? (
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={handleEditedUser}>Submit Edited</Button>
          )}
        </DialogActions>
      </Dialog>

      <UsersTable
        dispatch={dispatch}
        setOpen={setOpen}
        setShowInput={setShowInput}
        setId={setId}
        isLoading={isLoading}
        users={users}
        tab={tab}
      />

      <Button color="primary" onClick={handleClickOpen}>
        Create user
      </Button>
    </Grid>
  );
};

export default ActiveUsers;
