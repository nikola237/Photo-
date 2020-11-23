import React from 'react';

import { useAuthState } from '../../context/authContext/authContext';
import { AdminProvider } from '../../context/authContext/adminContext/adminContext';

import AdminRoutes from '../AdminRoutes/AdminRoutes';
import Editor from '../../pages/Editor/Editor';
import User from '../../pages/User/User';

const Authenticated = () => {
  const { user } = useAuthState();

  return (
    <div>
      {user.role === 2 ? (
        <AdminProvider>
          <AdminRoutes />
        </AdminProvider>
      ) : 'Error' ? (
        <Editor />
      ) : (
        <User />
      )}
    </div>
  );
};

export default Authenticated;
