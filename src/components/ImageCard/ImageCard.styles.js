import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
    width: '100%',
    // background: theme.palette.primary.dark,
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
}));
