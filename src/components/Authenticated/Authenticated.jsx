import React from 'react';

import { useAuthState } from '../../context/authContext';
//provider
import { ProjectsProvider } from '../../context/projectsContext';

//pages
import AdminRoutes from '../AdminRoutes/AdminRoutes';
import EditorRoutes from '../EditorRoutes/EditorRoutes';
import UserRoutes from '../UserRoutes/UserRoutes';

const Authenticated = () => {
  const { user } = useAuthState();

  return (
    <div>
      <ProjectsProvider>
        {user.role === 2 ? (
          <AdminRoutes />
        ) : user.role === 1 ? (
          <EditorRoutes />
        ) : (
          <UserRoutes />
        )}
      </ProjectsProvider>
    </div>
  );
};

export default Authenticated;
