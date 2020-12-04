import React from 'react';

import { useAuthState } from '../../context/authContext';

import AdminNav from '../AdminNav/AdminNav';
import EditorNav from '../EditorNav/EditorNav';

const Navigation = (props) => {
  const { user } = useAuthState();

  return (
    <div>
      {user.role === 2 ? (
        <AdminNav username={user.firstname} />
      ) : user.role === 1 ? (
        <EditorNav />
      ) : null}
    </div>
  );
};

export default Navigation;
