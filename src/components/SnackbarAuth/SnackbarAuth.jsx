import React from 'react';

//authProvider
import { useAuthState } from '../../context/authContext';

//styles
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from './SnackbarAuth.styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAuth = () => {
  const { status, setStatus } = useAuthState();
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setStatus({
      open: false,
      severity: status.severity,
      message: status.message,
    });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={status.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status.severity}>
          {status.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarAuth;
