import React, { useState, useCallback, useEffect } from 'react';
import api from '../../api/api';

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

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(10);

  const classes = useStyles();

  const getUsers = useCallback(async () => {
    const response = await api.get(`/users?size=${rowsPerPage}&page=${page}`);
    setData(response.data.rows);
    console.log(response, 'ovo je response!!!');
    setPage(response.data.currentPage);
  }, [page, rowsPerPage]);

  const deleteUserById = useCallback(
    async (id) => {
      const newUsersList = data.filter((user) => user.id !== id);

      // fetch('http://93.86.249.163:3030/users/remove', {
      //   method: 'DELETE',
      //   headers: { 'Content-type': 'application/json' },
      //   body: JSON.stringify({ id: id }),
      // }).then((el) => console.log(el, 'ovo je el'));

      setData(newUsersList);
      return newUsersList;
    },
    [data]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers, page, rowsPerPage, count]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage, 'ovo je Nova Starana');
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value, 10);
    setRowsPerPage(parseInt(event.target.value, count));
    // setPage(0);
  };
  return (
    <TableContainer component={Paper} className={classes.table}>
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
          {data &&
            data.map((row) => (
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
                  <Button onClick={() => deleteUserById(row.id)}>Remove</Button>
                </TableCell>

                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={15}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UsersTable;
