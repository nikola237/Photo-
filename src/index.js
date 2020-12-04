import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { AuthProvider } from './context/authContext';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,

  document.getElementById('root')
);
