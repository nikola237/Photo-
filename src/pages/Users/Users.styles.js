import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    minHeight: '100vh',
    display: 'flex',
    padding: '1%',
  },
  sidebarWrapper: {
    flex: '0 0 5%',
    marginRight: '25px',
  },
  wrapper: {
    flex: '0 0 90%',
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
    flex: 1,
    padding: '2%',
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
  },
  tableWrapper: {
    margin: '1% auto',
    fontSize: '20px',
  },
}));
