import React, { useState, useEffect, useCallback } from 'react';
//api
import api from '../../api/api';

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
import { Button } from '@material-ui/core';
import { useStyles } from './UsersTable.styles';

const UsersTable = ({
  dispatch,
  setOpen,
  setShowInput,
  setId,
  isLoading,
  users,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const classes = useStyles();

  console.log(users, 'ovo su user');

  const getData = useCallback(() => {
    const getActiveUsers = async () => {
      try {
        const response = await api.get(
          `/users?size=${rowsPerPage}&page=${page}`
        );
        console.log(response, 'iz usera');
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
    const response = await api.delete('/users/remove', { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const editUserById = async (id) => {
    const response = await api.get(`/user/${id}`);

    dispatch({ type: 'EDIT_USER', payload: response.data });
    setId(id);

    setShowInput(false);
    setOpen(true);
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

  return (
    <TableContainer component={Paper} className={classes.table}>
      {users ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow align="center">
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Remove</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow align="center" scope="row" key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{String(row.isactive)}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteUserById(row.id)}>Remove</Button>
                </TableCell>

                <TableCell>
                  <Button onClick={() => editUserById(row.id)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Spinner />
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
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
