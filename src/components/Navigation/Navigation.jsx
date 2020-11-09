import React from 'react';

import { useAuthState } from '../../context/authContext/authContext';

import AdminNav from '../AdminNav/AdminNav';
import EditorNav from '../EditorNav/EditorNav';

const Navigation = (props) => {
  const {
    state: { user },
    logout,
  } = useAuthState();

  return (
    <div>
      {user.role === 2 ? <AdminNav /> : user.role === 1 ? <EditorNav /> : null}
      <div>
        {user.firstname}
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Navigation;
