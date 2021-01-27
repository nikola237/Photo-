import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleFilledWhite } from '@material-ui/icons';
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '2% 1%',
    border: '4px solid black',
    position: 'relative',
    transformStyle: 'preserve-3d',
    overflow: 'inherit',
  },

  media: {
    minHeight: 260,
    margin: '20% 20% 0 20%',
    backgroundSize: 'inherit',
    position: 'relative',
    border: '3px solid black',
    transform: 'translateZ(10px)',
    transformStyle: 'preserve-3d',
    backgroundColor: 'white',
    // overflow:"inherit"
  },

  id: {
    textAlign: 'center',
    margin: '2% 0 0 0',
    color: '#6ac5a9',
  },

  content: {
    minHeight: '5vh',
    flexGrow: 1,
    textAlign: 'center',
    color: theme.palette.primary.light,
    padding: '0 5%',
  },
  buttons: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  textArea: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: 100,
  },
  imgWrapper: {
    position: 'relative',
    height: '50%',
    width: '100%',
    margin: '3%',
    transformStyle: 'preserve-3d',
  },
  background: {
    position: 'absolute',
    top: '5%',
    left: '7%',
    width: '100%',
    border: '4px solid black',
    height: '100%',
    backgroundColor: 'transparent',
    transform: 'translateZ(-100px)',
  },
  background1: {
    position: 'absolute',
    top: '-9%',
    left: '15%',
    width: '100%',
    height: '100%',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-1px)',
  },
}));
