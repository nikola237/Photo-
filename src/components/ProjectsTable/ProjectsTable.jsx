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
      console.log(projectname, isActiveProject, 'usao u nov projekat');
      const response = await api.post('/projects', {
        projectname: projectname,
        isactive: isActiveProject,
      });
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

    console.log(projectname, isActiveProject, editMode.rowKey, 'iz edita');
    const response = await api.put(`/project/${editMode.rowKey}`, {
      projectname: projectname,
      isactive: isActiveProject,
      projectId: editMode.rowKey,
    });
    dispatch({
      type: 'IN_EDIT_MODE',
      payload: {
        status: false,
        rowKey: null,
        newProject: false,
      },
    });
    dispatch({ type: 'IS_LOADING', payload: true });
    // console.log(response, 'iz edita');
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
        <TableHead>
          <TableRow align="center">
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Ime Projekta</TableCell>
            <TableCell align="center">Aktivan</TableCell>
            <TableCell align="center">Kreiran</TableCell>
            <TableCell align="center">Izmeni</TableCell>
            <TableCell align="center">Obrisi</TableCell>
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
                        value={projectname}
                        name="projectname"
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
                        onChange={(e) =>
                          updateFieldValue(e.target.name, e.target.value)
                        }
                      >
                        <option value={true}>Da</option>
                        <option value={false}>Ne</option>
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
                      <CheckCircleIcon onClick={() => handleIconSave()} />
                    ) : (
                      <EditIcon onClick={() => handleEditProject(project.id)} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editMode.status && editMode.rowKey === project.id ? (
                      <CancelIcon
                        onClick={() => handleIconCancle(editMode.rowKey)}
                      />
                    ) : (
                      <DeleteIcon
                        onClick={() => handleRemoveProject(project.id)}
                      />
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
