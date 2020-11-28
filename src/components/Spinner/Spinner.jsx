import React from 'react';

import { FaSpinner } from 'react-icons/fa';
import { Grid } from '@material-ui/core';
import { useStyles } from './Spinner.styles';
const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <FaSpinner className={classes.selector} />
    </Grid>
  );
};

export default Spinner;
