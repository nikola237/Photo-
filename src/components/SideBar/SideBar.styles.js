import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bar: {
    cursor: 'pointer',
    height: 265,
    width: 50,
    border: '2px solid black',
    zIndex: 3,
    position: 'relative',
    backgroundColor: 'white',
    transformStyle: 'preserve-3d',

    '& .MuiButtonBase-root': {
      paddingLeft: 5,
      paddingRight: 0,
    },
  },
  background: {
    position: 'absolute',
    transform: 'translateZ(-15px)',
    top: '4%',
    left: '20%',
    height: '98%',
    width: '100%',
    border: '2px solid black',
    zIndex: 2,
  },
  backgroundTwo: {
    position: 'absolute',
    backgroundColor: '#6ac5a9 ',
    transform: 'translateZ(-25px)',
    top: '8%',
    left: '45%',
    height: '98%',
    width: '100%',
  },
}));
