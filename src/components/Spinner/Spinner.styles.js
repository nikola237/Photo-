import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  '@keyframes myEffect': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  selector: {
    animation: '$myEffect 1s linear infinite',
    fontSize: '4em',
    height: '100vh',
  },
}));
