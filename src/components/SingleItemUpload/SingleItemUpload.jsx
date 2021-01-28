import React from 'react';

//asset
import play from '../../assets/play.png';
import audioIcon from '../../assets/file-audio-solid.svg';

///styles
import TextField from '@material-ui/core/TextField';
import { CardActions, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './SingleItemUpload.styles';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
const SingleItemUpload = ({
  file,
  title,
  tags,
  dispatch,
  fileUploadHandler,
}) => {
  const classes = useStyles();

  const updateFieldValue = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };
  const handleRemoveItem = (name) => {
    dispatch({ type: 'REMOVE_FILE', payload: name });
  };

  return (
    <Grid item container xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <Box className={classes.box}>
          <CloseIcon
            onClick={() => handleRemoveItem(file.name)}
            className={classes.button}
          />
        </Box>
        <Box className={classes.avatar}>
          {file.type === 'image/jpeg' || 'image/png' ? (
            <img
              src={file.preview}
              alt="media"
              style={{ width: '80px', height: '80px', borderRadius: '12px' }}
            />
          ) : null}
          {/* {file.type === } */}
        </Box>
        <CardContent className={classes.content}>
          <Typography>
            {file.ImageDescription
              ? file.ImageDescription.slice(0, 50).toLowerCase()
              : 'Морате додати тагове'}
          </Typography>
        </CardContent>
        <CardActions>
          <form className={classes.txtForm} onSubmit={fileUploadHandler}>
            <TextField
              autoFocus
              name="title"
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
              autoComplete="title"
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={title}
            />
            <TextField
              name="tags"
              margin="dense"
              id="tags"
              label="tags"
              type="text"
              fullWidth
              autoComplete="tags"
              onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
              value={tags}
            />
          </form>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SingleItemUpload;
