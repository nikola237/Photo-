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
import RestoreIcon from '@material-ui/icons/Restore';

const DeletedUsers = ({ dispatch, users, isLoading }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  const getData = useCallback(() => {
    const getRemovedUsers = async () => {
      const response = await api.get(
        `/users/remove/?page=${page}&size=${rowsPerPage}`
      );
      console.log(response.data.rows, 'useri');
      setCount(response.data.totalItems);
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
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const restoreUserById = async (id) => {
    const response = await api.post(`/users/restore`, { id });

    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const filterDate = (date)=>{
    var dateN = date.split('T')[0];
    const today = new Date(dateN)

    const year = today.getFullYear()
    
    const month = `${today.getMonth() + 1}`.padStart(2, "0")
    
    const day = `${today.getDate()}`.padStart(2, "0")
    
    const stringDate = [day, month, year].join(".") 
    return stringDate;
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      {users ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow align="center">
              <TableCell>Id</TableCell>
              <TableCell>Ime</TableCell>
              <TableCell>Prezime</TableCell>
              <TableCell>Korisničko ime</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Uloga</TableCell>
              <TableCell>Aktivan  </TableCell>
              <TableCell>Kreiran</TableCell>
              <TableCell>Vrati Korisnika</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => {
              if (users[0].message) {
                return (
                  <TableRow align="center" scope="row" key={1}>
                    <TableCell>{row.message}</TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow align="center" scope="row" key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                    {row.role==0&&<h3>Korisnik</h3>}
                    {row.role==1&&<h3>Urednik</h3>}
                    {row.role==2&&<h3>Administrator</h3>}
                  </TableCell>
                  <TableCell>{row.isactive&&<h3>Da</h3>||<h3>Ne</h3>}</TableCell>
                  <TableCell>{filterDate(row.createdAt)}</TableCell>


                    <TableCell>
                      <Button onClick={() => restoreUserById(row.id)}>
                        <RestoreIcon  fontSize="large" style={{ color: 'white' }}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
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
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DeletedUsers;
