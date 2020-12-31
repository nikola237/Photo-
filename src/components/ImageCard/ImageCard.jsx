import React from 'react';

//components
import RemoveButtons from '../RemoveButtons/RemoveButtons';
import Buttons from '../Buttons/Buttons';
import EditorButtons from '../EditorButtons/EditorButtons';

//authProvider
import { useAuthState } from '../../context/authContext';

//styles
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useStyles } from './ImageCard.styles';

const CardImage = ({
  originalname,
  tags,
  id,
  pathShort,
  filename,
  dispatch,
  tab,
  editMode,
  items,
}) => {
  const classes = useStyles();
  const { user } = useAuthState();
  const handleTextArea = (event) => {
    dispatch({ type: 'EDIT_MODE_TEXT', payload: event.target.value });
  };

  return (
    <Grid item container xs={12} sm={5} md={4} lg={3}>
      <Card className={classes.root}>
        <Box className={classes.id}>
          <Typography variant="h6">{`${id}`}</Typography>
        </Box>
        <CardMedia
          className={classes.media}
          image={`http://93.86.249.163:3030/items/display/${pathShort}`}
          title={`${originalname}`}
        />
        <CardContent className={classes.content}>
          {editMode.status && editMode.itemId === id ? (
            <TextareaAutosize
              value={editMode.tags}
              onChange={handleTextArea}
              className={classes.textArea}
            />
          ) : (
            <Typography variant="body2" component="p">
              {tags ? `${tags.toLowerCase().slice(0, 80)}...` : `${tags}`}
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

export default CardImage;
