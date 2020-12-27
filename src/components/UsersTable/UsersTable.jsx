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

      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste obrisali korisnika',
          severity: 'success',
          open: true,
        },
      });
    } catch (error) {}
  };

  const editUserById = async (id, index) => {
    const [editUser] = users.filter((user) => user.id === id);
    console.log(editUser, 'ovo je user');
    if (editUser) {
      const { firstname, lastname, username, email, role } = editUser;

      // console.log(firstname, lastname, username, email, role);
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
    console.log(id, 'iz cancela');
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
    if (
      inEditMode.newUser ||
      firstname === '' ||
      lastname === '' ||
      username === '' ||
      email === '' ||
      password === '' ||
      role === ''
    ) {
      const response = await api.post('/users', {
        firstname,
        lastname,
        username,
        email,
        role,
        password,
      });
      console.log(response, 'iz usera');
      dispatch({ type: 'IS_LOADING', payload: true });
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste kreirali korisnika',
          severity: 'success',
          open: true,
        },
      });
    }
    try {
      const response = await api.put(`/user/${inEditMode.rowKey}`, {
        firstname,
        lastname,
        username,
        email,
        role,
      });
      dispatch({ type: 'IS_LOADING', payload: true });
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste izmenili korisnika',
          severity: 'success',
          open: true,
        },
      });
    } catch (error) {}

    setInEditMode({
      status: false,
      rowKey: null,
    });
  };
  return (
    <TableContainer component={Paper} className={classes.table}>
      {users ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Ime</TableCell>
              <TableCell align="center">Prezime</TableCell>
              <TableCell align="center">Korisnik</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Uloga</TableCell>
              <TableCell align="center">
                {inEditMode.status && inEditMode.newUser
                  ? 'Lozinka'
                  : 'Aktivan'}
              </TableCell>
              <TableCell align="center">
                {inEditMode.status && inEditMode.newUser ? null : 'Kreiran'}
              </TableCell>
              <TableCell align="center">
                {inEditMode.status ? 'Sacuvaj' : 'Izmeni'}
              </TableCell>
              <TableCell align="center">
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
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <TextField
                        autoFocus
                        id="firstname"
                        name="firstname"
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                        value={firstname}
                      />
                    ) : (
                      row.firstname
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <TextField
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      row.lastname
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <TextField
                        name="username"
                        id="username"
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                        value={username}
                      />
                    ) : (
                      row.username
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <TextField
                        name="email"
                        id="email"
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                        value={email}
                      />
                    ) : (
                      row.email
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
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
                        <option value={0}>user</option>
                        <option value={1}>editor</option>
                        <option value={2}>admin</option>
                      </Select>
                    ) : (
                      <>
                        {row.role === 0 && <h3>user</h3>}
                        {row.role === 1 && <h3>editor</h3>}
                        {row.role === 2 && <h3>admin</h3>}
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status &&
                    inEditMode.newUser &&
                    inEditMode.rowKey === row.id ? (
                      <TextField
                        name="password"
                        id="password"
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                        value={password}
                      />
                    ) : (
                      (row.isactive && <h3>Da</h3>) || <h3>Ne</h3>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {filterDate(row.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <CheckCircleIcon onClick={() => handleIconSave()} />
                    ) : (
                      <EditIcon onClick={() => editUserById(row.id, index)} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {inEditMode.status && inEditMode.rowKey === row.id ? (
                      <CancelIcon
                        onClick={() => handleIconCancle(inEditMode.rowKey)}
                      />
                    ) : (
                      <DeleteIcon onClick={() => deleteUserById(row.id)} />
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
