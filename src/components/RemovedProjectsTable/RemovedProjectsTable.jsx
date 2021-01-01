import React from 'react';

//api
import api from '../../api/api';

//styles
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import RestoreIcon from '@material-ui/icons/Restore';
import { useStyles } from './RemovedProjectsTable.styles';

const RemovedProjectsTable = ({
  projects,
  dispatch,
  page,
  rowsPerPage,
  count,
}) => {
  const classes = useStyles();

  // const handleRemoveProject = async (id) => {
  //   const response = await api.delete(`/projects`, { data: { id } });
  //   dispatch({ type: 'IS_LOADING', payload: true });
  //   console.log(response, 'obrisan');
  // };

  const handleRestoreProject = async (id) => {
    const response = await api.post('/projects/restore', { id });
    dispatch({ type: 'IS_LOADING', payload: true });
    console.log(response);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage, 'novastrana');
    dispatch({ type: 'PAGE_PAGINATION', payload: newPage + 1 });
  };
  const handleChangeRowsPerPage = (event) => {
    dispatch({ type: 'ROWS_PAGE_PAGINATION', payload: +event.target.value });
    dispatch({ type: 'PAGE_PAGINATION', payload: 1 });
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

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow align="center">
            <TableCell align="center" className={classes.headTitle}>
              Id
            </TableCell>
            <TableCell align="center" className={classes.headTitle}>
              Ime Projekta
            </TableCell>
            <TableCell align="center" className={classes.headTitle}>
              Aktivan
            </TableCell>
            <TableCell align="center" className={classes.headTitle}>
              Kreiran
            </TableCell>
            {/* <TableCell align="center">Remove Project</TableCell> */}
            <TableCell align="center" className={classes.headTitle}>
              Vrati
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => {
            if (project?.message) {
              return (
                <TableRow align="center" scope="row" key={0}>
                  <TableCell align="center">{project.message}</TableCell>
                </TableRow>
              );
            } else {
              return (
                <TableRow align="center" scope="row" key={project.id}>
                  <TableCell align="center">{project.id}</TableCell>
                  <TableCell align="center">{project.projectname}</TableCell>
                  <TableCell align="center">
                    {String(project.isactive ? 'Da' : 'Ne')}
                  </TableCell>
                  <TableCell align="center">
                    {filterDate(project.createdAt)}
                  </TableCell>

                  {/*<TableCell>
                     <Button onClick={() => handleRemoveProject(project.id)}>
                      Remove
                    </Button>
                  </TableCell> */}
                  <TableCell align="center">
                    <RestoreIcon
                      style={{ color: '#64b5f6', cursor: 'pointer' }}
                      onClick={() => handleRestoreProject(project.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>

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

export default RemovedProjectsTable;
