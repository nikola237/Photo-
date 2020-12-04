import React from 'react';

//styles
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './ErrorCard.styles';

const ErrorCard = ({ message }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
