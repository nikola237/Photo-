import { makeStyles } from '@material-ui/core/styles';
import ikoncaKreiraj from '../../assets/ikoncaKreiraj.png';
import ikoncaObrisi from '../../assets/ikoncaObrisi.png';
export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    backgroundColor: 'white',
    color: 'black',
    boxShadow: 'none',
    '& .MuiTable-root': {
      border: 'none',
    },

    '& .MuiTableCell-root': {
      border: 'none',
      borderBottom: '3px solid black',
      textAlign: 'revert',
    },
  },
  headTitle: {
    fontSize: 17,
  },
  selected: {
    '& .MuiInputBase-input': {
      textAlign: 'inherit',
    },
  },
  editIcon: {
    backgroundImage: `url(${ikoncaKreiraj})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '50px',
    width: '50px',
  },
  createIcon: {
    backgroundImage: `url(${ikoncaObrisi})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '50px',
    width: '50px',
  },
}));
