import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    paddingTop: 30,
  },
  offset: theme.mixins.toolbar,
  root: {
    minWidth: 180,
  },
  media: {
    height: 25,
    backgroundSize: 'inherit',
  },
  content: {
    padding: 20,
  },
  dropZone: {
    height: 150,
    width: '50%',
    border: '4px dotted',
    alignItems: 'center',
  },

  fileContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
}));
