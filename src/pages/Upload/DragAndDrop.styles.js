import { makeStyles } from '@material-ui/core/styles';
import pozadina from '../../assets/pozadina-07.png';
import ikonca from '../../assets/ikonca.png';
export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: '1%',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#fff',
    // paddingTop: theme.spacing(8),
    // backgroundImage: `url(${pozadina})`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dropZoneWrapper: {
    flex: '0 0 92%',
    backgroundImage: `url(${pozadina})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100%',
  },
  sidebarWrapper: {
    flex: '0 0 5%',
    marginRight: '25px',
  },
  containerBackground1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '8%',
    left: '4%',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  containerBackground2: {
    position: 'absolute',
    width: '70%',
    height: '90%',
    bottom: '-8.5%',
    right: '-3%',
    backgroundColor: '#05bb8385',
    transform: 'translateZ(-5px)',
  },
  containerBackground3: {
    position: 'absolute',
    width: '70%',
    height: 'calc(100% + 32px)',
    top: '-8%',
    left: '-4%',
    transform: 'translateZ(-1px)',
    backgroundColor: '#05bb8385',
  },

  wrapper: {
    display: 'flex',
    paddingTop: theme.spacing(6),
  },
  dropZone: {
    flex: '0 0 93%',
    // marginRight: '3%',
    height: '75vh',
    margin: '4% 4% 4% 4%',
    backgroundColor: 'white',
    border: '3px solid black',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    transformStyle: 'preserve-3d',

    '&:focus': {
      outline: 'none',
    },
  },
  dropZoneFilled: {
    flex: '0 0 93%',
    // marginRight: '3%',
    height: '42vh',
    margin: '4% 4% 4% 4%',
    backgroundColor: 'white',
    border: '3px solid black',
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
  buttonsWraper: {
    padding: theme.spacing(6),
  },
  containerBackground2Filled: {
    position: 'absolute',
    width: '70%',
    height: '90%',
    bottom: '-42px',
    right: '-30px',
    backgroundColor: '#05bb8385',
    transform: 'translateZ(-5px)',
  },
  containerBackground1Filled: {
    position: 'absolute',
    width: '98%',
    height: '100%',
    top: '40px',
    left: '50px',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  divider: {
    width: '100%',
    background: theme.palette.secondary.main,
  },
}));
