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
    // boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.66)',
    // boxShadow: '22px 21px 4px 2px rgba(23,23,23,0.58)',

    border: '4px solid black',
    position: 'relative',
    zIndex: 2,
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

  background: {
    position: 'absolute',
    top: '9%',
    left: '22%',
    width: '75%',
    border: '4px solid black',
    height: '88%',
    zIndex: 1,
  },
}));
