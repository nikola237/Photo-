import React, { useEffect } from 'react';
//styles
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useStyles } from './Pagination.styles';

const PaginationComp = ({ dispatch, page, totalPages }) => {
  const classes = useStyles();
  const handleChange = (event, value) => {
    dispatch({ type: 'PAGE', payload: value });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <Grid container justify="center" className={classes.pagination}>
      {totalPages ? (
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={handleChange}
          className={classes.root}
        />
      ) : null}
    </Grid>
  );
};

export default PaginationComp;
