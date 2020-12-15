import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    backgroundSize: 'inherit',
  },
  offset: theme.mixins.toolbar,
}));
