import React from 'react';

import { useAuthState } from '../../context/authContext';

import AdminRoutes from '../AdminRoutes/AdminRoutes';
import Editor from '../../pages/Editor/Editor';
import User from '../../pages/User/User';

const Authenticated = () => {
  const { user } = useAuthState();

  return (
    <div>
      {user.role === 2 ? (
        <AdminRoutes />
      ) : user.role === 1 ? (
        <Editor />
      ) : (
        <User />
      )}
    </div>
  );
};

export default Authenticated;
