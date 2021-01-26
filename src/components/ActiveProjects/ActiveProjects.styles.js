import { makeStyles } from '@material-ui/core/styles';
import ikonca from '../../assets/kreirajNoviProjekat.png';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  addProject: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    backgroundImage: `url(${ikonca})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '70px',
    width: '70px',
  },
  filter: {
    paddingBottom: '2%',
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
    '& .MuiInput-underline:before': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.dark,
    },

    '& .MuiInput-underline:after': {
      borderColor: theme.palette.secondary.dark,
    },
  },
  select: {
    alignSelf: 'end',
    width: '20%',
  },
  project: {
    flex: '1 0 auto',
    padding: '10px',
    border: '3px solid black',
    backgroundColor: 'white',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },

  content: {
    flex: '1 0 auto',
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
  },
  tableBackground1: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '15px',
    left: '15px',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  tableBackground2: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '35px',
    left: '35px',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-25px)',
  },
}));
