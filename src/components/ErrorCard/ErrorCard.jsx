import React from 'react';

//styles
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './ErrorCard.styles';

const ErrorCard = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} sm={5} md={4} lg={3} xl={1}>
      <Card className={classes.root}>
        <Box className={classes.id}>
          <Typography variant="h6">Nema rezultata</Typography>
        </Box>
        <CardMedia
          className={classes.media}
          image="asd"
          title="Nema rezultata"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="body2"
            component="p"
            className={classes.id}
          ></Typography>
        </CardContent>

        <CardActions className={classes.buttons}></CardActions>
      </Card>
    </Grid>
  );
};

export default ErrorCard;
