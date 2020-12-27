import { makeStyles } from '@material-ui/core/styles';
import topLogo from '../../assets/topLogo.png';
export const useStyles = makeStyles((theme) => ({
  root: {
    height: 60,
    width: '100%',
  },
  footer: {
    backgroundImage: `url(${topLogo})`,
    // backgroundColor: theme.palette.primary.light,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}));
