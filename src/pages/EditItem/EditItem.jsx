import React, { useEffect } from 'react';
//api
import api from '../../api/api';

//router
import { useHistory } from 'react-router-dom';

//provider
import {
  useProjectsState,
  useProjectsDispatch,
} from '../../context/projectsContext.js';

//styles
import { Button, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useStyles } from './EditItem.styles';

const EditItem = () => {
  const { editItemId, editItem } = useProjectsState();
  const projectsDispatch = useProjectsDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { pathShort, tags, originalname, type } = editItem;

  useEffect(() => {
    if (editItemId !== null) {
      async function getItemById() {
        const response = await api.get(`/item/${editItemId}`);

        projectsDispatch({ type: 'EDIT_ITEM', payload: response.data });
      }
      getItemById();
    } else {
      history.push('/');
    }
  }, [editItemId, history, projectsDispatch]);

  const updateFieldValue = (field, value) => {
    projectsDispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };
  const handleSubmit = async () => {
    const response = await api.post(`/items/update/${editItemId}`, {
      tags,
      originalname,
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
      history.push('/');
    }
    console.log(response, 'response itema');
  };

  const handleCancel = () => {
    history.push('/');
  };

  return (
    <Grid container justify="center" className={classes.offset}>
      <div>
        {type === '0' && (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`http://93.86.249.163:3030/items/display/${pathShort}`}
              />
            </CardActionArea>
          </Card>
        )}
        {type === '1' && (
          <Card className={classes.root}>
            <CardMedia
              component="video"
              controlsList="nodownload"
              controls
              className={classes.media}
              image={`http://93.86.249.163:3030/items/display/${pathShort}`}
              type="/video.mp4"
            />
          </Card>
        )}
        {type === '2' && (
          <Card className={classes.root}>
            <CardMedia
              component="audio"
              controlsList="nodownload"
              controls
              className={classes.media}
              image={`http://93.86.249.163:3030/items/display/${pathShort}`}
              type="/audio.mp3"
            />
          </Card>
        )}
      </div>

      <Grid item container justify="center">
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
            <TextField
              name="originalname"
              margin="dense"
              id="title"
              label="title"
              type="title"
              fullWidth
              autoComplete="originalname"
              required
              value={originalname}
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
            />
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
              value={tags}
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
            />
          </FormControl>
          <Grid container item justify="center">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditItem;
