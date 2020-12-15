import React from 'react';

//router
import { useHistory } from 'react-router-dom';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { useStyles } from './Buttons.styles';

const Buttons = ({ dispatch, id, pathShort, filename }) => {
  const projectsDispatch = useProjectsDispatch();

  const history = useHistory();

  const classes = useStyles();

  //remove item
  const handleRemoveItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });

    const response = await api.delete('/items/remove', { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  //edit item by id
  const handleItemId = async (id) => {
    console.log(id, 'ovo je id');
    // const response = await api.get(`/item/${id}`);
    projectsDispatch({
      type: 'EDIT_ITEM_ID',
      payload: id,
    });
    history.push(`/edit/${id}`);
  };

  //download item
  const handleDownloadItem = (id) => {
    projectsDispatch({
      type: 'ITEM_INFO',
      payload: { id, pathShort, filename },
    });
    history.push(`/download/${id}`);
  };

  return (
    <div>
      <Button onClick={() => handleItemId(id)} size="small" color="primary">
        Edit
      </Button>
      <Button
        onClick={() => handleDownloadItem(id)}
        size="small"
        color="primary"
      >
        Download
      </Button>
      <Button
        onClick={() => handleRemoveItem(id)}
        size="small"
        color="primary"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );
};

export default Buttons;
