import React from 'react';

import { useProjectsDispatch } from '../../context/projectsContext';

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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useStyles } from './ProjectsTable.styles';

const ProjectsTable = ({
  projects,
  dispatch,
  page,
  rowsPerPage,
  count,
  editMode,
  projectname,
  isActiveProject,
}) => {
  const classes = useStyles();
  const projectsDispatch = useProjectsDispatch();
  const updateFieldValue = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };

  const handleRemoveProject = async (id) => {
    const response = await api.delete('/projects/remove', { data: { id } });
    if (response.status === 200) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste obrisali projekat',
          severity: 'success',
          open: true,
        },
      });
    }
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const handleEditProject = (projectId) => {
    const [editProject] = projects.filter(
      (project) => project.id === projectId
    );
    const { projectname, isactive, id } = editProject;

    if (editProject) {
      dispatch({
        type: 'EDIT_PROJECT',
        payload: {
          projectname: projectname,
          isActiveProject: isactive,
        },
      });
    }
    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: true,
        rowKey: id,
        newProject: null,
      },
    });
  };

  const handleIconCancle = (id) => {
    if (editMode.newProject) {
      const remove = projects.filter((project) => project.id !== id);
      dispatch({ type: 'PROJECTS', payload: remove });
    }
    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: false,
        rowKey: null,
        newProject: false,
      },
    });
    dispatch({ type: 'RESET' });
  };

  const handleIconSave = async () => {
    if (projectname === '') {
      return;
    }

    if (editMode.newProject) {
      const response = await api.post('/projects', {
        projectname: projectname,
        isactive: isActiveProject,
      });

      if (response.status === 200) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste kreirali projekat',
            severity: 'success',
            open: true,
          },
        });
      }
      dispatch({ type: 'IS_LOADING', payload: true });
      dispatch({ type: 'RESET' });
      dispatch({
        type: 'IN_EDIT_MODE',
        payload: {
          status: false,
          rowKey: null,
          newProject: false,
        },
      });
      return;
    }

    const response = await api.put(`/project/${editMode.rowKey}`, {
      projectname: projectname,
      isactive: isActiveProject,
      projectId: editMode.rowKey,
    });
    if (response.status === 200) {
      if (response.status === 200) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste izmenili projekat',
            severity: 'success',
            open: true,
          },
        });
      }
    }
    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: false,
        rowKey: null,
        newProject: false,
      },
    });
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const handleChangePage = (event, newPage) => {
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
          <TableRow align="center" className={classes.headTitle}>
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
            <TableCell align="center" className={classes.headTitle}>
              {editMode.status ? 'Sacuvaj' : 'Izmeni'}
            </TableCell>
            <TableCell align="center" className={classes.headTitle}>
              {editMode.status ? 'Odustani' : 'Ukloni'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => {
            if (project?.message) {
              return (
                <TableRow align="center" scope="row" key={1}>
                  <TableCell>{project.message}</TableCell>
                </TableRow>
              );
            } else {
              return (
                <TableRow align="center" scope="row" key={project.id}>
                  <TableCell align="center">{project.id}</TableCell>
                  <TableCell align="center">
                    {editMode.status && editMode.rowKey === project.id ? (
                      <TextField
                        autoFocus
                        value={projectname}
                        name="projectname"
                        className={
                          editMode.status && editMode.rowKey === project.id
                            ? classes.selected
                            : null
                        }
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      project.projectname
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editMode.status && editMode.rowKey === project.id ? (
                      <Select
                        native
                        labelId="select"
                        name="isActiveProject"
                        id="select"
                        value={isActiveProject}
                        className={
                          editMode.status && editMode.rowKey === project.id
                            ? classes.selected
                            : null
                        }
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                      >
                        <option style={{ color: 'black' }} value={true}>
                          Da
                        </option>
                        <option style={{ color: 'black' }} value={false}>
                          Ne
                        </option>
                      </Select>
                    ) : (
                      String(project.isactive ? 'Da' : 'Ne')
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {filterDate(project.createdAt)}
                  </TableCell>

                  <TableCell align="center">
                    {editMode.status && editMode.rowKey === project.id ? (
                      <CheckCircleIcon
                        style={{ color: '#4caf50', cursor: 'pointer' }}
                        onClick={() => handleIconSave()}
                      />
                    ) : (
                      // <EditIcon
                      //   style={{ color: '#64b5f6', cursor: 'pointer' }}
                      //   onClick={() => handleEditProject(project.id)}
                      // />
                      <div
                        className={classes.editIcon}
                        onClick={() => handleEditProject(project.id)}
                      ></div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editMode.status && editMode.rowKey === project.id ? (
                      <CancelIcon
                        style={{ color: '#d32f2f', cursor: 'pointer' }}
                        onClick={() => handleIconCancle(editMode.rowKey)}
                      />
                    ) : (
                      // <DeleteIcon
                      //   style={{ color: '#d32f2f', cursor: 'pointer' }}
                      //   onClick={() => handleRemoveProject(project.id)}
                      // />
                      <div
                        className={classes.createIcon}
                        onClick={() => handleRemoveProject(project.id)}
                      ></div>
                    )}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        className={classes.pagination}
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
