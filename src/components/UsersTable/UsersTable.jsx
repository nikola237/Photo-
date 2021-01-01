import React, { useState, useEffect, useCallback } from 'react';
//api
import api from '../../api/api';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//components
import Spinner from '../Spinner/Spinner';

//styles
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { useStyles } from './UsersTable.styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';

const UsersTable = ({
  dispatch,
  isLoading,
  users,
  firstname,
  lastname,
  username,
  email,
  role,
  password,
  inEditMode,
  setInEditMode,
}) => {
  const projectsDispatch = useProjectsDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const classes = useStyles();

  const getData = useCallback(() => {
    const getActiveUsers = async () => {
      try {
        const response = await api.get(
          `/users?size=${rowsPerPage}&page=${page}`
        );

        setCount(response.data.totalItems);
        dispatch({ type: 'USERS', payload: response.data.rows });
      } catch (error) {
        console.log(error, 'usao u error');
      }
    };
    getActiveUsers();
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    getData();
  }, [page, rowsPerPage, dispatch, getData]);

  const deleteUserById = async (id) => {
    try {
      const response = await api.delete('/users/remove', { data: { id } });
      dispatch({ type: 'IS_LOADING', payload: true });
      if (response.status === 200) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste obrisali korisnika',
            severity: 'success',
            open: true,
          },
        });
      }
    } catch (error) {}
  };

  const editUserById = async (id, index) => {
    const [editUser] = users.filter((user) => user.id === id);

    if (editUser) {
      const { firstname, lastname, username, email, role } = editUser;

      dispatch({
        type: 'EDIT_USER',
        payload: {
          firstname,
          lastname,
          username,
          email,
          role,
        },
      });
    }
    setInEditMode({
      status: true,
      rowKey: id,
    });
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

  useEffect(() => {
    if (isLoading) {
      getData();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [dispatch, getData, isLoading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };
  const filterDate = (date) => {
    if (!date) {
      return null;
    }

    var dateN = date.split('T')[0];
    const today = new Date(dateN);
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    const stringDate = [day, month, year].join('.');
    return stringDate;
  };

  //ikone
  const handleIconCancle = (id) => {
    if (inEditMode.newUser) {
      const remove = users.filter((user) => user.id !== id);
      dispatch({ type: 'USERS', payload: remove });
    }
    setInEditMode({
      status: false,
      rowKey: null,
    });
    dispatch({ type: 'RESET' });
  };
  const handleIconSave = async (event) => {
    if (inEditMode.newUser && inEditMode.status) {
      if (
        firstname === '' ||
        lastname === '' ||
        username === '' ||
        email === '' ||
        role === '' ||
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

      const response = await api.post('/users', {
        firstname,
        lastname,
        username,
        email,
        role,
        password,
      });

      dispatch({ type: 'IS_LOADING', payload: true });
      if (response.status === 200) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste kreirali korisnika',
            severity: 'success',
            open: true,
          },
        });
      }
      setInEditMode({
        status: false,
        rowKey: null,
        newUser: false,
      });
      return;
    } else {
      try {
        const response = await api.put(`/user/${inEditMode.rowKey}`, {
          firstname,
          lastname,
          username,
          email,
          role,
        });
        dispatch({ type: 'IS_LOADING', payload: true });
        if (response.status === 200) {
          projectsDispatch({
            type: 'SNACKBAR',
            payload: {
              message: 'Uspesno ste izmenili korisnika',
              severity: 'success',
              open: true,
            },
          });
        }
      } catch (error) {}

      setInEditMode({
        status: false,
        rowKey: null,
      });
    }
  };
  return (
    <TableContainer component={Paper} className={classes.table}>
      {users ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headTitle} align="center">
                Id
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                Ime
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                Prezime
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                Korisnik
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                Email
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                Rola
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                {inEditMode.status && inEditMode.newUser
                  ? 'Lozinka'
                  : 'Aktivan'}
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                {'Kreiran'}
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                {inEditMode.status ? 'Sacuvaj' : 'Izmeni'}
              </TableCell>
              <TableCell className={classes.headTitle} align="center">
                {inEditMode.status ? 'Odustani' : 'Ukloni'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => {
              if (users[0].message) {
                return (
                  <TableRow align="center" scope="row" key={1}>
                    <TableCell>{row.message}</TableCell>
                  </TableRow>
                );
              } else {
              }
              return (
                <TableRow align="center" scope="row" key={row.id}>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <Box width={100}>
                        <TextField
                          autoFocus
                          id="firstname"
                          name="firstname"
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                          value={firstname}
                        />
                      </Box>
                    ) : (
                      row.firstname
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <Box width={100}>
                        <TextField
                          name="lastname"
                          id="lastname"
                          value={lastname}
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                        />
                      </Box>
                    ) : (
                      row.lastname
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <Box width={100}>
                        <TextField
                          name="username"
                          id="username"
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                          value={username}
                        />
                      </Box>
                    ) : (
                      row.username
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <Box width={170}>
                        <TextField
                          name="email"
                          id="email"
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                          value={email}
                        />
                      </Box>
                    ) : (
                      row.email
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <Box width={120}>
                        <Select
                          native
                          labelId="User role"
                          name="role"
                          id="select"
                          value={role}
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                        >
                          <option style={{ color: 'black' }} value={0}>
                            user
                          </option>
                          <option style={{ color: 'black' }} value={1}>
                            editor
                          </option>
                          <option style={{ color: 'black' }} value={2}>
                            admin
                          </option>
                        </Select>
                      </Box>
                    ) : (
                      <>
                        {row.role === 0 && <p>user</p>}
                        {row.role === 1 && <p>editor</p>}
                        {row.role === 2 && <p>admin</p>}
                      </>
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status &&
                    inEditMode.newUser &&
                    inEditMode.rowKey === row.id ? (
                      <Box width={100}>
                        <TextField
                          name="password"
                          id="password"
                          onChange={(e) =>
                            updateFieldValue(e.target.name, e.target.value)
                          }
                          value={password}
                        />
                      </Box>
                    ) : (
                      (row.isactive && <p>Da</p>) || <p>Ne</p>
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {filterDate(row.createdAt)}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <CheckCircleIcon
                        style={{ color: '#4caf50', cursor: 'pointer' }}
                        onClick={() => handleIconSave()}
                      />
                    ) : (
                      <EditIcon
                        style={{ color: '#64b5f6', cursor: 'pointer' }}
                        onClick={() => editUserById(row.id, index)}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={
                      inEditMode.status && inEditMode.rowKey === row.id
                        ? classes.selected
                        : null
                    }
                  >
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <CancelIcon
                        style={{ color: '#d32f2f', cursor: 'pointer' }}
                        onClick={() => handleIconCancle(inEditMode.rowKey)}
                      />
                    ) : (
                      <DeleteIcon
                        style={{ color: '#d32f2f', cursor: 'pointer' }}
                        onClick={() => deleteUserById(row.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Spinner />
      )}

      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        labelRowsPerPage="Rezultata po stranici"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UsersTable;
