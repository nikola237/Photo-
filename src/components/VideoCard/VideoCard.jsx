import React from 'react';
//authProvider
import { useAuthState } from '../../context/authContext';

//components
import RemoveButtons from '../RemoveButtons/RemoveButtons';
import Buttons from '../Buttons/Buttons';
import EditorButtons from '../EditorButtons/EditorButtons';

//styles
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useStyles } from './VideoCard.styles';

const VideoCard = ({
  originalname,
  pathShort,
  tags,
  id,
  filename,
  dispatch,
  tab,
  editMode,
  items,
}) => {
  const { user } = useAuthState();
  const classes = useStyles();

  const handleTextArea = (event) => {
    console.log(event.target.value);
    dispatch({ type: 'EDIT_MODE_TEXT', payload: event.target.value });
  };
  return (
    <Grid item container xs={12} sm={5} md={4} lg={3}>
      <Card className={classes.root}>
        <Box className={classes.id}>
          <Typography variant="h6">{`Id: ${id}`}</Typography>
        </Box>
        <CardMedia
          component="video"
          controlsList="nodownload"
          controls
          className={classes.media}
          image={`http://93.86.249.163:3030/items/display/${pathShort}`}
          type="/video.mp4"
          title={`${originalname}`}
        />
        <CardContent className={classes.content}>
          {editMode.status && editMode.itemId === id ? (
            (console.log(editMode.status, editMode.itemId),
            (
              <TextareaAutosize
                value={editMode.tags}
                className={classes.textArea}
                onChange={handleTextArea}
              />
            ))
          ) : (
            <Typography variant="body2" component="p" className={classes.id}>
              {`${tags}`}
            </Typography>
          )}
        </CardContent>
        {user.role === 2 ? (
          <CardActions className={classes.buttons}>
            {tab !== 1 ? (
              <Buttons
                dispatch={dispatch}
                id={id}
                pathShort={pathShort}
                filename={filename}
                tags={tags}
                editMode={editMode}
                items={items}
              />
            ) : (
              <RemoveButtons dispatch={dispatch} id={id} />
            )}
          </CardActions>
        ) : user.role === 1 ? (
          <CardActions className={classes.buttons}>
            {tab !== 1 ? (
              <EditorButtons
                dispatch={dispatch}
                id={id}
                pathShort={pathShort}
                filename={filename}
                tags={tags}
                editMode={editMode}
                items={items}
              />
            ) : (
              <RemoveButtons dispatch={dispatch} id={id} />
            )}
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
};

export default VideoCard;
