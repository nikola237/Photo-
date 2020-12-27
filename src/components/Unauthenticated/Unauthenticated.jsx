import React from 'react';
import SignIn from '../SignIn/SignIn';
import { ProjectsProvider } from '../../context/projectsContext';

const Unauthenticated = () => {
  return (
    <div>
      <ProjectsProvider>
        <SignIn />
      </ProjectsProvider>
    </div>
  );
};

export default Unauthenticated;
