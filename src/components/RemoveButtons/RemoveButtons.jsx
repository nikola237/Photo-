import React from 'react';
//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//assets
import { ReactComponent as RestoreIcon } from '../../assets/restore-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './RemoveButtons.styles';

const RemoveButtons = ({ id, dispatch }) => {
  const projectsDispatch = useProjectsDispatch();
  const classes = useStyles();
  const handleRestoreItem = async (id) => {
    // dispatch({ type: 'REMOVE_ITEM', payload: id });

    const response = await api.post('/items/restore', { id });

    if (response.status === 200) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste vratili item',
          severity: 'success',
          open: true,
        },
      });
    }
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  const handleDeleteItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    const response = await api.delete('items', { data: { id } });
    if (response.status === 200) {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Uspesno ste obrisali item',
          severity: 'success',
          open: true,
        },
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => handleRestoreItem(id)}
        size="small"
        color="primary"
      >
        <Tooltip title="Vrati">
          <RestoreIcon className={classes.buttonIcons} />
        </Tooltip>
      </Button>

      <Button color="primary" onClick={() => handleDeleteItem(id)}>
        <Tooltip title="Обриши">
          <DeleteIcon className={classes.buttonIcons} />
        </Tooltip>
        <div className={classes.background}></div>
      </Button>
    </div>
  );
};

export default RemoveButtons;
