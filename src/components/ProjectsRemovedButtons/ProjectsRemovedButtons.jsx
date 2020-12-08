import React from 'react';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';

const ProjectsRemovedButtons = ({ id, dispatch }) => {
  const handleRemoveProject = async (id) => {
    const response = await api.delete(`/projects`, { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
    console.log(response, 'obrisan');
  };

  const handleRestoreProject = async (id) => {
    const response = await api.post('/projects/restore', { id });
    dispatch({ type: 'IS_LOADING', payload: true });
    console.log(response);
  };
  // /projects/restore
  return (
    <div>
      <Button onClick={() => handleRemoveProject(id)}>Remove</Button>
      <Button onClick={() => handleRestoreProject(id)}>Restore</Button>
    </div>
  );
};

export default ProjectsRemovedButtons;
