import React, { useState, useEffect, useCallback } from 'react';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

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
import { useStyles } from './DeletedUsers.styles';
import RestoreIcon from '@material-ui/icons/Restore';

const DeletedUsers = ({ dispatch, users, isLoading }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const projectsDispatch = useProjectsDispatch();

  const getData = useCallback(() => {
    const getRemovedUsers = async () => {
      const response = await api.get(
        `/users/remove/?page=${page}&size=${rowsPerPage}`
      );
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

    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const filterDate = (date) => {
    var dateN = date.split('T')[0];
    const today = new Date(dateN);

    const year = today.getFullYear();

    const month = `${today.getMonth() + 1}`.padStart(2, '0');

    const day = `${today.getDate()}`.padStart(2, '0');

    const stringDate = [day, month, year].join('.');
    return stringDate;
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      {users ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow align="center">
              <TableCell align="center" className={classes.headTitle}>
                Id
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Ime
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Prezime
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Korisničko ime
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Rola
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Aktivan{' '}
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Kreiran
              </TableCell>
              <TableCell align="center" className={classes.headTitle}>
                Vrati Korisnika
              </TableCell>
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
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.firstname}</TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      {row.role === 0 && <p>Korisnik</p>}
                      {row.role === 1 && <p>Urednik</p>}
                      {row.role === 2 && <p>Administrator</p>}
                    </TableCell>
                    <TableCell align="center">
                      {(row.isactive && <p>Da</p>) || <p>Ne</p>}
                    </TableCell>
                    <TableCell align="center">
                      {filterDate(row.createdAt)}
                    </TableCell>

                    <TableCell align="center">
                      <RestoreIcon
                        style={{ color: '#64b5f6', cursor: 'pointer' }}
                        onClick={() => restoreUserById(row.id)}
                      />
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
