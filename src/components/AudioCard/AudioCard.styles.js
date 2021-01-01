import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    width: '100%',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.66)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  media: {
    height: 150,
    width: '90%',
    padding: 15,
    backgroundSize: 'inherit',
  },

  id: {
    textAlign: 'center',
    margin: 10,
  },
  content: {
    margin: 16,
  },
  buttons: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  textArea: {
    width: '100%',
  },
});
