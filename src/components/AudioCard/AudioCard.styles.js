import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
  audioWrapper: {
    height: 50,
    width: '70%',
    margin: '25% auto 15% auto',
    position: 'relative',
    border: '3px solid black',
    transform: 'translateZ(10px)',
    transformStyle: 'preserve-3d',
  },
  media: {
    height: '100%',
    width: '100%',
    backgroundSize: 'inherit',
    backgroundColor: '#f1f3f4',
  },

  id: {
    textAlign: 'center',
    margin: '2% 0 0 0',
    color: '#6ac5a9',
  },
  content: {
    margin: 16,
    color: '#5b5b5b',
    textAlign: 'center',
  },
  buttons: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  textArea: {
    width: '100%',
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
    top: '-38%',
    left: '9%',
    width: '100%',
    height: '100%',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-1px)',
  },
});
