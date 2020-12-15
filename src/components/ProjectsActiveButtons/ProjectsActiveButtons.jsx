import React from 'react';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';

const ProjectsActiveButtons = ({ id, dispatch }) => {
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

  return (
    <div>
      <Button onClick={() => handleRemoveProject(id)}>Remove</Button>
      <Button onClick={() => handleEditProject(id)}>Edit</Button>
    </div>
  );
};

export default ProjectsActiveButtons;
