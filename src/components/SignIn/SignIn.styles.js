import { makeStyles } from '@material-ui/core/styles';
// import slika3 from '../../assets/pozadina-07.jpg';
import books from '../../assets/pozadina-07.png';
import klett from '../../assets/klett.png';
import logos from '../../assets/logos.png';
import freska from '../../assets/freska.png';
export const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px solid black',
    height: '45vh',
    width: 400,
    flex: 1,
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  loginBackground1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '40px',
    left: '45px',
    transform: 'translateZ(-10px)',
    border: '3px solid black',
  },
  loginBackground2: {
    position: 'absolute',
    width: '70%',
    height: '80%',
    bottom: '-37px',
    right: '-42px',
    transform: 'translateZ(-5px)',
    backgroundColor: '#05bb8385',
  },
  loginBackground3: {
    position: 'absolute',
    width: '70%',
    height: 'calc(100% + 32px)',
    top: '-32px',
    left: '-37px',
    transform: 'translateZ(-1px)',
    backgroundColor: '#05bb8385',
  },

  header: {
    height: 100,
    width: '100%',
    display: 'flex',
    background: `linear-gradient(90deg, rgba(0,0,0,1) 50%, rgba(365,365,365,0.7) 99%)`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // background: ' rgba(365,365,365,0.7)',
  },
  content: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },
  logoFreska: {
    width: 119,
    height: 48,
    backgroundImage: `url(${freska})`,
    margin: theme.spacing(3),
  },
  logoLogos: {
    width: 120,
    height: 48,
    backgroundImage: `url(${logos})`,
    margin: theme.spacing(3),
  },
  logoKlett: {
    width: 94,
    height: 48,
    backgroundImage: `url(${klett})`,
    margin: theme.spacing(3),
  },
  footer: {
    height: 150,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: 20,
    background: `linear-gradient(90deg, rgba(0,0,0,1) 50%, rgba(365,365,365,0.7) 99%)`,
    color: '#fff',
  },
  textField: {
    '& .makeStyles-textField-9': {
      width: '100%',
    },
  },
  avatar: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
  },
  hero: {
    backgroundImage: `url(${books})`,
    backgroundColor: 'white',
    backgroundSize: 'cover',
    // background: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(87,88,86,1) 95%), url(${books}) `
    backgroundRepeat: 'no-repeat',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundPosition: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '31ch',
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: '#000',
    },
  },
  icon: {
    position: 'end',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
