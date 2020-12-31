import { makeStyles } from '@material-ui/core/styles';
import slika8 from '../../assets/slika8.jpg';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    minHeight: '100vh',
    backgroundColor: '#EEEEEE',
    paddingTop: theme.spacing(8),
  },

  wrapper: {
    display: 'flex',
  },
  dropZone: {
    height: 160,
    marginBottom: theme.spacing(4),
    alignItems: 'center',
    borderRadius: '27px',
    backgroundImage: `url(${slika8})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    cursor: 'pointer',

    '&:focus': {
      outline: 'none',
    },
  },

  fileContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },

  button: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: '#fff',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#fff',
    },
  },
}));
