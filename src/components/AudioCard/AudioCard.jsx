import React from 'react';

//components
import RemoveButtons from '../RemoveButtons/RemoveButtons';
import Buttons from '../Buttons/Buttons';

//styles
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { useStyles } from './AudioCard.styles';

const MediaCard = ({
  // originalname,
  pathShort,
  tags,
  id,
  filename,
  dispatch,
  tab,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="audio"
          controlsList="nodownload"
          controls
          className={classes.media}
          image={`http://93.86.249.163:3030/items/display/${pathShort}`}
          type="/audio.mp3"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Tags
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${tags}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {tab !== 1 ? (
          <Buttons
            dispatch={dispatch}
            id={id}
            pathShort={pathShort}
            filename={filename}
          />
        ) : (
          <RemoveButtons dispatch={dispatch} id={id} />
        )}
      </CardActions>
    </Card>
  );
};

export default MediaCard;
