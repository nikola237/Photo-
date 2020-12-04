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

import { useStyles } from './ImageCard.styles';

const CardImage = ({
  // originalname,
  tags,
  id,
  pathShort,
  filename,
  dispatch,
  tab,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http://93.86.249.163:3030/items/display/${pathShort}`}
          title="Contemplative Reptile"
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
            tags={tags}
          />
        ) : (
          <RemoveButtons dispatch={dispatch} id={id} />
        )}
      </CardActions>
    </Card>
  );
};

export default CardImage;
