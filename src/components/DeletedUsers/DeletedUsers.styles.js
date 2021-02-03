import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    padding: '10px',
    border: '3px solid black',
    backgroundColor: 'white',
    position: 'relative',
    transformStyle: 'preserve-3d',
    overflow: 'unset',
  },
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
    },
  },
  headTitle: {
    fontSize: 17,
  },
  selected: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
  },
  tableBackground1: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '15px',
    left: '15px',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  tableBackground2: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '35px',
    left: '35px',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-25px)',
  },

  buttonIcons: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
}));
