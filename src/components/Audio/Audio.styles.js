import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 180,
    height: '100%',
  },
  media: {
    height: 200,
    backgroundSize: 'inherit',
  },
  content: {
    padding: 20,
  },
}));
