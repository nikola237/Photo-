import React from 'react';
//provider
import { useAuthState } from '../../context/authContext';
//components
import AdminNav from '../AdminNav/AdminNav';
import EditorNav from '../EditorNav/EditorNav';
import UserNav from '../UserNav/UserNav';
const Navigation = (props) => {
  const { user } = useAuthState();

  return (
    <div>
      {user.role === 2 ? (
        <AdminNav />
      ) : user.role === 1 ? (
        <EditorNav />
      ) : (
        <UserNav />
      )}
    </div>
  );
};

export default Navigation;
