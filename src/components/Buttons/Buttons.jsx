import React, { useState } from 'react';

//router
import { useHistory } from 'react-router-dom';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//api
import api from '../../api/api';

//assets
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as GetAppIcon } from '../../assets/download.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

import { ReactComponent as CheckCircleIcon } from '../../assets/confirm-icon.svg';
import { ReactComponent as CancelIcon } from '../../assets/cancel-icon.svg';

//styles
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import { useStyles } from './Buttons.styles';

const Buttons = ({ dispatch, id, pathShort, filename, items, editMode }) => {
  const [idEdit, setIdEdit] = useState(null);
  const projectsDispatch = useProjectsDispatch();

  const history = useHistory();

  const classes = useStyles();

  //remove item
  const handleRemoveItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });

    const response = await api.delete('/items/remove', { data: { id } });

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
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  //edit item by id
  const handleItemId = async (id) => {
    const [edit] = items.filter((item) => item.id === id);

    dispatch({
      type: 'EDIT_MODE',
      payload: { status: true, itemId: edit.id, tags: edit.tags },
    });

    setIdEdit(id);
  };

  //download item
  const handleDownloadItem = (id) => {
    projectsDispatch({
      type: 'ITEM_INFO',
      payload: { id, pathShort, filename },
    });
    history.push(`/download/${id}`);
  };
  const handleIconCancel = () => {
    dispatch({
      type: 'EDIT_MODE',
      payload: { status: false, itemId: null, tags: null },
    });
  };

  const handleIconCheck = async () => {
    if (editMode.tags === '') {
      projectsDispatch({
        type: 'SNACKBAR',
        payload: {
          message: 'Polje sa tagovima ne sme biti prazno!',
          severity: 'warning',
          open: true,
        },
      });
      dispatch({
        type: 'EDIT_MODE',
        payload: { status: false, itemId: null, tags: null },
      });
      return;
    } else {
      const response = await api.post(`/items/update/${idEdit}`, {
        tags: editMode.tags,
      });
      if (response.status === 200) {
        projectsDispatch({
          type: 'SNACKBAR',
          payload: {
            message: 'Uspesno ste izmenili item',
            severity: 'success',
            open: true,
          },
        });
      }
      dispatch({
        type: 'EDIT_MODE',
        payload: { status: false, itemId: null, tags: null },
      });
      dispatch({ type: 'IS_LOADING', payload: true });
    }
  };

  return (
    <Grid container justify="center" className={classes.root}>
      {editMode.status && editMode.itemId === idEdit ? (
        <>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleIconCheck}
            size="small"
          >
            <Tooltip title="??????????????">
              <CheckCircleIcon className={classes.buttonIcons} />
            </Tooltip>
          </Button>

          <Button
            color="primary"
            variant="outlined"
            onClick={handleIconCancel}
            size="small"
          >
            <Tooltip title="????????????????">
              <CancelIcon className={classes.buttonIcons} />
            </Tooltip>
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" onClick={() => handleItemId(id)}>
            <Tooltip title="????????????">
              <EditIcon className={classes.buttonIcons} />
            </Tooltip>
            <div className={classes.background}></div>
          </Button>
          <Button color="primary" onClick={() => handleDownloadItem(id)}>
            <Tooltip title="??????????????">
              <GetAppIcon className={classes.buttonIcons} />
            </Tooltip>
            <div className={classes.background}></div>
          </Button>
          <Button color="primary" onClick={() => handleRemoveItem(id)}>
            <Tooltip title="????????????">
              <DeleteIcon className={classes.buttonIcons} />
            </Tooltip>
            <div className={classes.background}></div>
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Buttons;
