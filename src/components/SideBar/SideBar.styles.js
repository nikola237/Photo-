import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bar: {
    cursor: 'pointer',
    height: 265,
    width: 74,
    border: '4px solid black',
    zIndex: 3,
    position: 'relative',
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '8%',
    left: '38%',
    height: '98%',
    width: '100%',
    border: '4px solid black',
    zIndex: 2,
  },
  backgroundTwo: {
    position: 'absolute',
    backgroundColor: '#6ac5a9 ',
    top: '13%',
    left: '65%',
    height: '98%',
    width: '100%',
  },
}));
