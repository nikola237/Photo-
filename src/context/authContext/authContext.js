import api from '../../api/api';
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';

//context
const AuthContext = createContext();

//provider
function AuthProvider({ children }) {
  const [state, setState] = useState({
    status: null,
    error: null,
    user: null,
  });

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(token, 'ovo je token');
    if (token && user) {
      setState({
        status: 'success',
        error: null,
        user: user,
        loggedIn: true,
      });
    }
  }, []);

  //login
  const login = useCallback(async (email, password) => {
    setState({ status: 'pending', error: null, user: null, loggedIn: false });

    try {
      const response = await api.post('/login', { email, password });
      window.localStorage.setItem('token', JSON.stringify(response.data.token));

      const user = await api.get(`/user/${response.data.userId}`);
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user.data));
      }

      setState({
        status: 'success',
        error: null,
        user: user.data,
        loggedIn: true,
      });
    } catch (error) {
      setState({
        status: 'error',
        error: 'Incorrect email or password!',
        user: null,
        loggedIn: false,
      });
    }
  }, []);

  //logout
  const logout = () => {
    window.localStorage.clear();
    setState({ status: null, error: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
//hook
function useAuthState() {
  const state = useContext(AuthContext);
  const isPending = state.status === 'pending';
  const isError = state.status === 'error';
  const isSuccess = state.status === 'success';
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
}

export { AuthProvider, useAuthState };
