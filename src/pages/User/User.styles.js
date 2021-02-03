import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: '3%',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  sidebarWrapper: {
    flex: '0 0 5%',
    marginRight: '25px',
  },
  offset: theme.mixins.toolbar,
  searchContainer: {
    // paddingTop: theme.spacing(8),
    width: '100%',
    display: 'flex',
  },
  radioBtn: {
    paddingBottom: 22,
  },
  content: {
    height: 200,
  },
  itemWrapper: {
    padding: '1%',
  },
}));
