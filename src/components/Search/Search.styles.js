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
  },
}));
