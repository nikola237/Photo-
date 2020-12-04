import React, { useEffect } from 'react';
//styles
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import { useStyles } from './Pagination.styles';

const PaginationComp = ({ dispatch, page, totalPages }) => {
  const classes = useStyles();

  const handleChange = (value) => {
    dispatch({ type: 'PAGE', payload: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <Grid container>
      {totalPages ? (
        <div className={classes.root}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </div>
      ) : null}
    </Grid>
  );
};

export default PaginationComp;
