import React from 'react';

import { useAuthState } from './context/authContext';

import { BrowserRouter as Routes } from 'react-router-dom';

import Authenticated from './components/Authenticated/Authenticated';
import Unauthenticated from './components/Unauthenticated/Unauthenticated';

function App() {
  const { user } = useAuthState();

  return (
    <div>
      {user ? (
        <Routes>
          <Authenticated />
        </Routes>
      ) : (
        <Unauthenticated />
      )}
    </div>
  );
}

export default App;
