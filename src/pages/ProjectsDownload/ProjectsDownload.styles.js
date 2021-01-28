import { makeStyles } from '@material-ui/core/styles';
import check from '../../assets/check.svg';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  searchContainer: {
    padding: '2% 0 2% 0',
    marginLeft: '3.5%',
  },
  radioButtons: {
    marginLeft: '4%',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  root: {
    width: '90%',
    padding: '1%',
    backgroundColor: 'white',
    position: 'relative',
    border: '3px solid black',
    transformStyle: 'preserve-3d',
    margin: '3% auto',
    '& .MuiListItem-root': {
      borderBottom: '3px solid black',
    },
  },
  background: {
    position: 'absolute',
    top: '4%',
    left: '2%',
    width: '100%',
    border: '3px solid black',
    height: '100%',
    backgroundColor: 'transparent',
    transform: 'translateZ(-2px)',
  },
  background1: {
    position: 'absolute',
    top: '10%',
    left: '4%',
    width: '100%',
    height: '100%',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-3px)',
  },
  check: {
    backgroundImage: `url(${check})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '30px',
    width: '35px',
    cursor: 'pointer',
  },
}));
