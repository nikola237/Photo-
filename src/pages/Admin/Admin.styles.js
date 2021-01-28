import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    padding: '1%',
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
  tabs: {
    width: '45%',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',

      '& .MuiButtonBase-root': {
        flex: '0 0 35%',
      },
    },
    '& .MuiTab-wrapper': {
      zIndex: '1',
      fontSize: '14px',
      fontWeight: '700',
    },
    '& .MuiTabs-scroller span:last-child': {
      height: '5px',
    },
  },

  content: {
    height: 310,
  },
  itemWrapper: {
    padding: '1%',
  },
}));
