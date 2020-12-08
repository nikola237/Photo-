import React, { useState } from 'react';

// //api
// import api from '../../api/api';

//components
import ProjectsRemovedButtons from '../ProjectsRemovedButtons/ProjectsRemovedButtons';
import ProjectsActiveButtons from '../ProjectsActiveButtons/ProjectsActiveButtons';

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
import { useStyles } from './ProjectsTable.styles';

const ProjectsTable = ({ projects, tab, dispatch, isLoading }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

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
                <TableRow align="center" scope="row" key={0}>
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
                  {tab === 0 ? (
                    <TableCell>
                      <ProjectsActiveButtons
                        id={project.id}
                        dispatch={dispatch}
                        isLoading={isLoading}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <ProjectsRemovedButtons
                        id={project.id}
                        dispatch={dispatch}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>

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

export default ProjectsTable;
