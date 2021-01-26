import { makeStyles } from '@material-ui/core/styles';
import ikonca from '../../assets/ikoncaDodajKorisnika.png';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    paddingLeft: 85,
    paddingRight: 50,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  addUser: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    backgroundImage: `url(${ikonca})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100px',
    width: '100px',
  },

  content: {
    flex: '1 0 auto',
    padding: '10px',
    border: '3px solid black',
    backgroundColor: 'white',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  tableBackground1: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '15px',
    left: '15px',
    border: '3px solid black',
    transform: 'translateZ(-10px)',
  },
  tableBackground2: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '35px',
    left: '35px',
    backgroundColor: '#6ac5a9',
    transform: 'translateZ(-25px)',
  },
  footer: {
    flexShrink: 0,
    justifyContent: 'center',
  },
  buttonCreate: {
    '&.MuiButton-textPrimary': {
      background: '#343a40',
      color: 'white',
      borderRadius: '9px',
      width: 'fit-content',
      padding: '15px ',
      margin: '10px 0',
      '&:hover': {
        backgroundColor: '#343a40de',
      },
    },
  },
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      backgroundColor: 'white',
      background: ' white',
      borderRadius: '8px',
      '& .MuiDialogContent-root': {
        padding: '30px',
      },
      '& .MuiFormControl-fullWidth': {
        padding: '15px',
      },
      '& .MuiFormLabel-root': {},
      '& .MuiDialogTitle-root': {
        background: 'white',
        padding: '20px',
        borderBottom: '1px solid #949494',
        '& .MuiTypography-h6': {
          textAlign: 'center',
          fontSize: '23px',
          color: 'white',
          fontWeight: 700,
        },
      },
      '& .MuiButton-root': {
        border: '1px solid grey',
        borderRadius: '9px',
        padding: '10px',
      },
    },
  },
}));
