import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    width: '100%',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  media: {
    height: 272,
    backgroundSize: 'inherit',
  },

  id: {
    textAlign: 'center',
    color: '#fff',
    margin: 10,
  },
  content: {
    margin: 16,
  },
  buttons: {
    textAlign: 'center',
    justifyContent: 'center',
  },
});
