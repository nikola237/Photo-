import React, { useEffect } from 'react';

import {
  useAdminState,
  useAdminDispatch,
} from '../../context/authContext/adminContext/adminContext';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationComp = () => {
  const { page, totalPages } = useAdminState();
  const dispatch = useAdminDispatch();
  const classes = useStyles();
  console.log(totalPages, 'ovo je TOTAL');
  const handleChange = (event, value) => {
    dispatch({ type: 'PAGE', payload: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      {totalPages ? (
        <div className={classes.root}>
          <Typography>Page: {page}</Typography>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default PaginationComp;
