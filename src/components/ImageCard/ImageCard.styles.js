import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 340,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },

  media: {
    minHeight: 260,
    backgroundSize: 'inherit',
  },

  id: {
    textAlign: 'center',
    margin: 10,
    color: theme.palette.secondary.dark,
  },

  content: {
    minHeight: '5vh',
    flexGrow: 1,
    textAlign: 'center',
    color: theme.palette.primary.light,
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
}));
