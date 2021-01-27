import { makeStyles } from '@material-ui/core/styles';

import books from '../../assets/pozadina-07.png';

export const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px solid black',
    height: '45vh',
    width: 400,
    flex: 1,
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  loginBackground1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '40px',
    left: '45px',
    transform: 'translateZ(-10px)',
    border: '3px solid black',
  },
  loginBackground2: {
    position: 'absolute',
    width: '70%',
    height: '80%',
    bottom: '-37px',
    right: '-42px',
    transform: 'translateZ(-5px)',
    backgroundColor: '#05bb8385',
  },
  loginBackground3: {
    position: 'absolute',
    width: '70%',
    height: 'calc(100% + 32px)',
    top: '-32px',
    left: '-37px',
    transform: 'translateZ(-1px)',
    backgroundColor: '#05bb8385',
  },

  content: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },

  textField: {
    '& .makeStyles-textField-9': {
      width: '100%',
    },
  },
  avatar: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
  },
  hero: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${books})`,
    backgroundColor: 'white',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundPosition: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '31ch',
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#000',
    },
  },
  icon: {
    position: 'end',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
