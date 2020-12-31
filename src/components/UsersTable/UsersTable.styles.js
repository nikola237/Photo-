import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  head: {
    backgroundColor: theme.palette.common.black,
  },

  headTitle: {
    color: theme.palette.common.white,
    fontSize: 17,
  },
  selected: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
    '& .MuiInput-underline:before': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.dark,
    },

    '& .MuiInput-underline:after': {
      borderColor: theme.palette.secondary.dark,
    },
  },
}));
