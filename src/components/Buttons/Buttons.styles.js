import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContenent: 'center',
    justifyContent: 'space-around',
    flexShrink: 0,
  },

  tooltip: {
    width: 500,
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
}));
