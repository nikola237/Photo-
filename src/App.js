import React from 'react';
//authProvider
import { useAuthState } from './context/authContext';
//rrd
import { BrowserRouter as Routes } from 'react-router-dom';

//components
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
