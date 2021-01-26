import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  search: {
    zIndex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '4px solid #6AC5A9  ',
    },
    '& .MuiInputBase-root ': {
      background: 'transparent',
    },
    // boxShadow: '-35px 24px 1px -9px #6AC5A9',
  },
  // searchLay: {
  //   position: 'absolute',
  //   top: '20%',
  //   right: '9%',
  //   height: '50%',
  //   width: '98%',
  //   backgroundColor: '#6ac5a9 ',
  //   // transform: 'translateZ(-10px)',
  // },
}));
