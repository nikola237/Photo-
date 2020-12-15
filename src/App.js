import React from 'react';

import { useAuthState } from './context/authContext';

import { BrowserRouter as Routes } from 'react-router-dom';
// import Spinner from './components/Spinner/Spinner';

// const Authenticated = React.lazy(() =>
//   import('./components/Authenticated/Authenticated')
// );

// const Unauthenticated = React.lazy(() =>
//   import('./components/Unauthenticated/Unauthenticated')
// );

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
