import React from 'react';

//provider
import {
  useProjectsState,
  useProjectsDispatch,
} from '../../context/projectsContext';

//styles
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './SnackbarAlert.styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = () => {
  const {
    snackbar: { message, severity, open },
  } = useProjectsState();
  const projectDispatch = useProjectsDispatch();
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    projectDispatch({
      type: 'SNACKBAR',
      payload: {
        message: message,
        severity: severity,
        open: false,
      },
    });
  };
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarAlert;
