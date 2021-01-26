import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sidebarWrapper: {
    flex: '0 0 5%',
    marginRight: '25px',
  },
  container: {
    padding: '1% 2%',
    flex: '0 0 92%',
    backgroundColor: 'white',
    height: 'initial',
    minHeight: '100vh',

    borderRadius: '6px',
  },

  heading: {
    display: 'flex',
    flex: '0 0 93%',
    justifyContent: 'space-between',
    color: '#fff',
  },
  picker: {
    position: 'relative',
    width: 'max-content',
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '0 15px',
    marginBottom: '10px',
    height: '100px',
    color: 'black',
    transformStyle: 'preserve-3d',
  },
  buttons: {
    height: '100px',
  },

  typeButton: {
    border: '2px solid black',
    backgroundColor: 'transparent',
    position: 'relative',
    color: 'black',
    fontSize: '30px',
    maxWidth: '150px',
    fontWeight: 700,
    padding: '0 20px',
    marginLeft: '1%',
    flex: '1 1 10%',
    cursor: 'pointer',
    zIndex: '2',
    transformStyle: 'preserve-3d',

    '&.text': {
      verticalAlign: 'middle',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '20px',
      margin: '0',
    },
    '& p': {
      textAlign: 'center',
      marginTop: '30px',
    },
  },
}));
