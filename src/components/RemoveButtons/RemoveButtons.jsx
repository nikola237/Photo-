import React from 'react';
//api
import api from '../../api/api';
//styles
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import Tooltip from '@material-ui/core/Tooltip';

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
        <Tooltip title="Vrati">
          <RestoreIcon />
        </Tooltip>
      </Button>
      <Button onClick={() => handleDeleteItem(id)} size="small" color="primary">
        <Tooltip title="Obrisi">
          <DeleteIcon />
        </Tooltip>
      </Button>
    </div>
  );
};

export default RemoveButtons;
