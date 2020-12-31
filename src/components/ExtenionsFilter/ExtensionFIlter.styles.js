import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filter: {
    '&:before': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
    },

    '&:after': {
      borderColor: theme.palette.secondary.dark,
    },
  },
}));
