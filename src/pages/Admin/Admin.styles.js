import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
  },
  offset: theme.mixins.toolbar,

  searchContainer: {
    padding: 30,
  },
  radioBtn: {
    paddingBottom: 22,
  },
  logo: {
    height: 30,
    position: 'fixed',
    bottom: '0',
  },
  pagination: {
    justifyContent: 'center',
    padding: '15px',
  },
}));
