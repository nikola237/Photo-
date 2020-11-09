import React from 'react';

import { useAuthState } from './context/authContext/authContext';
import Authenticated from './components/Authenticated/Authenticated';
import Unauthenticated from './components/Unauthenticated/Unauthenticated';

import { BrowserRouter as Routes } from 'react-router-dom';

function App() {
  const {
    state: { user },
  } = useAuthState();

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
