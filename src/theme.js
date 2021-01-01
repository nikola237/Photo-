// import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5b5b5b',
      main: '#333333',
      dark: '#232323',
    },
    secondary: {
      light: '#33bfff',
      main: '#00b0ff',
      dark: '#007bb2',
    },
  },
});

export default theme;
