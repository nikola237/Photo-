import React, { useState } from 'react';

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
import Button from '@material-ui/core/Button';
import { useStyles } from './ProjectsTable.styles';

const ProjectsTable = ({ projects, dispatch, page, rowsPerPage, count }) => {
  const classes = useStyles();

  const handleRemoveProject = async (id) => {
    const response = await api.delete('/projects/remove', { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
  };
  const handleEditProject = async (id) => {
    const response = await api.get(`/project/${id}`);
    console.log(response.data, 'iz Edita');
    dispatch({ type: 'EDIT_PROJECT', payload: response.data });

    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage, 'novastrana');
    dispatch({ type: 'PAGE_PAGINATION', payload: newPage + 1 });
  };
  const handleChangeRowsPerPage = (event) => {
    dispatch({ type: 'ROWS_PAGE_PAGINATION', payload: +event.target.value });
    dispatch({ type: 'PAGE_PAGINATION', payload: 1 });
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow align="center">
            <TableCell>Id</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Remove Project</TableCell>
            <TableCell>Edit Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => {
            if (project?.message) {
              return (
                <TableRow align="center" scope="row" key={1}>
                  <TableCell>{project.message}</TableCell>
                </TableRow>
              );
            } else {
              return (
                <TableRow align="center" scope="row" key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.projectname}</TableCell>
                  <TableCell>{String(project.isactive)}</TableCell>
                  <TableCell>{project.createdAt}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleRemoveProject(project.id)}>
                      Remove
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button onClick={() => handleEditProject(project.id)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>

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

export default ProjectsTable;
