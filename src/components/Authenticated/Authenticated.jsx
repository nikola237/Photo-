import React from 'react';

import { useAuthState } from '../../context/authContext/authContext';
import { AdminProvider } from '../../context/authContext/adminContext/adminContext';

import AdminRoutes from '../AdminRoutes/AdminRoutes';
import Editor from '../../pages/Editor/Editor';
import User from '../../pages/User/User';

import { BrowserRouter as Router, useHistory } from 'react-router-dom';

const Authenticated = () => {
  const history = useHistory();
  const {
    state: { user },
  } = useAuthState();

  if (user.role === 2) {
    history.push('/admin');
    return (
      <Router>
        <AdminProvider>
          <AdminRoutes />
        </AdminProvider>
      </Router>
    );
  } else if (user.role === 1) {
    history.push('/editor');
    return (
      <Router>
        <Editor />
      </Router>
    );
  } else {
    history.push('/user');
    return (
      <Router>
        <User />
      </Router>
    );
  }
};

export default Authenticated;
