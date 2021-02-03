import { makeStyles } from '@material-ui/core/styles';
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
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: 35,
    height: 35,
    cursor: 'pointer',
  },
  createIcon: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: 35,
    height: 35,
    cursor: 'pointer',
  },

  buttonIcons: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: '25%',
    right: '19%',
    height: '68%',
    width: '48%',
    backgroundColor: '#f78e1f   ',
  },
}));
