import React from 'react';

//asset
import play from '../../assets/play.png';

///styles
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './SingleItemUpload.styles';

const SingleItemUpload = ({
  files,
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

  return (
    <Grid container>
      <Paper>
        {files &&
          files.map((file) =>
            file.type !== 'image/jpeg' ? (
              <Card className={classes.root} key={file.name}>
                <Avatar alt="Remy Sharp" src={play} />
                <CardContent>
                  <Typography>{file.name}</Typography>
                </CardContent>

                <Divider />
              </Card>
            ) : (
              <Card className={classes.root} key={file.name}>
                <Avatar alt="Remy Sharp" src={file.preview} />
                <CardContent>
                  <Typography>{file.name}</Typography>
                </CardContent>

                <Divider />
              </Card>
            )
          )}
        <form onSubmit={fileUploadHandler}>
          <TextField
            autoFocus
            name="title"
            margin="dense"
            id="title"
            label="title"
            type="text"
            fullWidth
            autoComplete="title"
            required
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
            required
            onChange={(e) => updateFieldValue(e.target.name, e.target.value)}
            value={tags}
          />
        </form>
      </Paper>
    </Grid>
  );
};

export default SingleItemUpload;
