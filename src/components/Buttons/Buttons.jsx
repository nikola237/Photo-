import React, { useState } from 'react';

//router
import { useHistory } from 'react-router-dom';

//provider
import { useProjectsDispatch } from '../../context/projectsContext';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
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
    console.log(response, 'iz downloada');
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

    console.log(edit, 'ovo je item');
    dispatch({
      type: 'EDIT_MODE',
      payload: { status: true, itemId: edit.id, tags: edit.tags },
    });

    setIdEdit(id);
    // projectsDispatch({
    //   type: 'EDIT_ITEM_ID',
    //   payload: id,
    // });
    // history.push(`/edit/${id}`);
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
      dispatch({
        type: 'EDIT_MODE',
        payload: { status: false, itemId: null, tags: null },
      });
      dispatch({ type: 'IS_LOADING', payload: true });
    }
  };
  return (
    <div className={classes.root}>
      {editMode.status && editMode.itemId === idEdit ? (
        <>
          <Tooltip title="Potvrdi">
            <CheckCircleIcon onClick={handleIconCheck} />
          </Tooltip>
          <Tooltip title="Odustani">
            <CancelIcon onClick={handleIconCancel} />
          </Tooltip>
        </>
      ) : (
        <>
          <Button onClick={() => handleItemId(id)} size="small" color="primary">
            <Tooltip title="Izmeni">
              <EditIcon />
            </Tooltip>
          </Button>
          <Button
            onClick={() => handleDownloadItem(id)}
            size="small"
            color="primary"
          >
            <Tooltip title="Preuzmi">
              <GetAppIcon />
            </Tooltip>
          </Button>
          <Button
            onClick={() => handleRemoveItem(id)}
            size="small"
            color="primary"
          >
            <Tooltip title="Obrisi">
              <DeleteIcon />
            </Tooltip>
          </Button>
        </>
      )}
    </div>
  );
};

export default Buttons;
