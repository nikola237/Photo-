import React from 'react';
//api
import api from '../../api/api';
//styles
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const RemoveButtons = ({ id, dispatch }) => {
  const handleRestoreItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });

    const response = await api.post('/items/restore', { id });
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const handleDeleteItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    const response = await api.delete('items', { data: { id } });
  };

  return (
    <div>
      <Button
        onClick={() => handleRestoreItem(id)}
        size="small"
        color="primary"
      >
        Restore
      </Button>
      <Button
        onClick={() => handleDeleteItem(id)}
        startIcon={<DeleteIcon />}
        size="small"
        color="primary"
      >
        Delete
      </Button>
    </div>
  );
};

export default RemoveButtons;
