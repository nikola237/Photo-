import React, { useEffect, useState } from 'react';

//api
import api from '../../api/api';

//styles
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { FormGroup } from '@material-ui/core';
import { useStyles } from './Buttons.styles';

//utils

import Download from '../Download/Download';

const Buttons = ({ dispatch, id, pathShort, filename }) => {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(false);
  const [item, setItem] = useState('');
  const [name, setName] = useState(null);
  const [checked, setChecked] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const handleChange = async (event) => {
    const { value, checked } = event.currentTarget;
    setProjectId(value);

    console.log(parseInt(value), checked);
  };

  const classes = useStyles();

  //remove item
  const handleRemoveItem = async (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });

    const response = await api.delete('/items/remove', { data: { id } });
    dispatch({ type: 'IS_LOADING', payload: true });
  };

  //edit item by id
  const handleItemId = async (id) => {
    const response = await api.get(`/item/${id}`);
    setItem(response.data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = async (pathShort, filename) => {
    console.log('usao u download');
    setProject(false);
    const response = await api.get(
      `/items/download/${pathShort}/${projectId}`,
      {
        responseType: 'blob',
      }
    );

    const data = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', `${filename}`);

    link.click();
    link.remove();
  };

  const changeHandler = (event) => {
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post(`/items/update/`);
  };

  //download item
  const handleDownloadItem = (pathShort, filename) => {
    const getActiveProjects = async () => {
      const response = await api.get('/projects?size=20');
      console.log(response, 'ovo je response');

      const active = await response.data.rows.filter(
        (el) => el.isactive !== false
      );
      setName(active);
      setProject(true);
    };
    getActiveProjects();
  };

  return (
    <div>
      <Button onClick={() => handleItemId(id)} size="small" color="primary">
        Edit
      </Button>
      <Button
        onClick={() => handleDownloadItem(pathShort, filename)}
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
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        fullWidth={true}
        maxWidth="lg"
        open={project}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {name
          ? name.map((el) => (
              <div key={el.id}>
                <Checkbox
                  value={el.id}
                  checked={el.checked}
                  onChange={handleChange}
                  color="primary"
                  type="checkbox"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                {el.projectname}
              </div>
            ))
          : 'loading'}
        <DialogActions>
          <Button
            onClick={() => handleDownload(pathShort, filename, projectId)}
            color="primary"
          >
            Submit project
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
        {item.type === 0 && (
          <CardMedia
            style={{ height: '200px' }}
            className={classes.media}
            image={`http://93.86.249.163:3030/items/display/${item.pathShort}`}
          />
        )}
        {item.type === 2 && (
          <CardMedia
            component="audio"
            controlsList="nodownload"
            controls
            className={classes.media}
            image={`http://93.86.249.163:3030/items/display/${item.pathShort}`}
            type="/audio.mp3"
          />
        )}
        {item.type === 1 && (
          <CardMedia
            component="video"
            controlsList="nodownload"
            controls
            className={classes.media}
            image={`http://93.86.249.163:3030/items/display/${item.pathShort}`}
            type="/video.mp4"
          />
        )}
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                name="tags"
                margin="dense"
                id="tags"
                label="tags"
                type="tags"
                fullWidth
                autoComplete="tags"
                required
                rowsMax={4}
                value={item.tags || ''}
                onChange={changeHandler}
              />
              <TextField
                name="title"
                margin="dense"
                id="title"
                label="title"
                type="title"
                fullWidth
                autoComplete="title"
                required
                // onChange={}
                value={item.originalname || ''}
                onChange={changeHandler}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Buttons;
