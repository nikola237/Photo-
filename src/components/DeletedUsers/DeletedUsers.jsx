import React, { useState, useEffect, useCallback } from 'react';

//api
import api from '../../api/api';

//components
import Spinner from '../../components/Spinner/Spinner';

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
import { useStyles } from './DeletedUsers.styles';

const DeletedUsers = ({ dispatch, users, isLoading }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const getData = useCallback(() => {
    const getRemovedUsers = async () => {
      const response = await api.get(
        `/users/remove/?page=${page}&size=${rowsPerPage}`
      );

      dispatch({ type: 'USERS', payload: response.data.rows });
    };
    getRemovedUsers();
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (isLoading) {
      getData();
      dispatch({ type: 'IS_LOADING', payload: false });
    }
  }, [dispatch, getData, isLoading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  const restoreUserById = async (id) => {
    const response = await api.post(`/users/restore`, { id });

    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const removeUserById = async (id) => {
    // dispatch({ type: 'REMOVE_USER', payload: id });
    const response = await api.delete('/users', { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
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
                <TableCell>{row.isActive}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <Button onClick={() => removeUserById(row.id)}>Remove</Button>
                </TableCell>

                <TableCell>
                  <Button onClick={() => restoreUserById(row.id)}>
                    Restore
                  </Button>
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
        count={50}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DeletedUsers;
