import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
  },
  media: {
    height: 200,
    backgroundSize: 'inherit',
  },
  content: {
    padding: 20,
  },
  background: {
    position: 'absolute',
    top: '25%',
    right: '19%',
    height: '68%',
    width: '48%',
    backgroundColor: '#f78e1f   ',
  },

  buttons: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  buttonIcons: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
});
