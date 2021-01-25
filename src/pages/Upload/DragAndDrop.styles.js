import { makeStyles } from '@material-ui/core/styles';
import slika8 from '../../assets/slika8.jpg';
import pozadina from '../../assets/pozadina-07.png';
import ikonca from '../../assets/ikonca.png';
export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#EEEEEE',
    paddingTop: theme.spacing(8),
    backgroundImage: `url(${pozadina})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  containerBackground1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '40px',
    left: '50px',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  containerBackground2: {
    position: 'absolute',
    width: '70%',
    height: '90%',
    bottom: '-42px',
    right: '-40px',
    backgroundColor: '#05bb8385',
    transform: 'translateZ(-5px)',
  },
  containerBackground3: {
    position: 'absolute',
    width: '70%',
    height: 'calc(100% + 32px)',
    top: '-32px',
    left: '-45px',
    transform: 'translateZ(-1px)',
    backgroundColor: '#05bb8385',
  },

  wrapper: {
    display: 'flex',
  },
  dropZone: {
    height: '75vh',
    width: '85vw',
    margin: '0 auto',
    backgroundColor: 'white',
    border: '3px solid black',
    marginBottom: theme.spacing(4),
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    transformStyle: 'preserve-3d',

    '&:focus': {
      outline: 'none',
    },
  },
  ikonca: {
    backgroundImage: `url(${ikonca})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '15%',
    height: '25%',
  },
  fileContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },

  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: '#fff',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#fff',
    },
  },
}));
