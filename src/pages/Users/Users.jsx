import React, { useState } from 'react';
import api from '../../api/api';
import UsersTable from '../../components/UsersTable/UsersTable';

import { Grid, MenuItem } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import { useStyles } from './Users.styles';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const handleUser = (event) => {
    console.log(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.itemContainer}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="first name"
              label="first Name"
              type="text"
              fullWidth
              onChange={handleUser}
              autoComplete="first name"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="last name"
              label="last name"
              type="text"
              fullWidth
              onChange={handleUser}
              autoComplete="last name"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="username"
              type="username"
              fullWidth
              onChange={handleUser}
              autoComplete="username"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="email"
              type="email"
              fullWidth
              onChange={handleUser}
              autoComplete="email"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="password"
              type="password"
              fullWidth
              onChange={handleUser}
              autoComplete="password"
              required
            />
            <Select native labelId="User role" id="select" value={1}>
              <option value={0}>User</option>
              <option value={1}>Editor</option>
              <option value={2}>Admin</option>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <UsersTable />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
    </Grid>
  );
};

export default Users;
