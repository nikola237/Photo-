import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: '100vh',
    backgroundColor: '#fff',
    borderRadius: 17,
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    width: '50%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: theme.palette.common.black,
  },
  submit: {},
  textField: {
    '& .makeStyles-textField-9': {
      width: '100%',
    },
  },
  buttons: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: '#fff',
      color: 'black',
    },
  },
  margin: theme.spacing(3, 0, 2),
  marginTop: theme.spacing(2),
}));
