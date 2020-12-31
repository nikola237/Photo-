import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';

//api
import api from '../api/api';

//context
const AuthContext = createContext();

//provider
function AuthProvider({ children }) {
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user')) || null
  );
  const [status, setStatus] = useState({
    message: 'AUTH PRIMER',
    severity: 'success',
    open: false,
  });

  useEffect(() => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [token, user]);

  //login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      setToken(response.data.token);
      if (response.status === 200) {
        setUser(response.data.user);
        setStatus({
          message: 'Uspesno ste se ulogovali',
          severity: 'success',
          open: true,
        });
      }
    } catch (error) {
      setStatus({
        message: 'Neispravan email ili password',
        severity: 'error',
        open: true,
      });
    }
  }, []);

  //logout
  const logout = () => {
    window.localStorage.clear();
    setStatus({
      message: 'Neispravan email ili password',
      severity: 'error',
      open: false,
    });
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{ status, setStatus, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
//hook
function useAuthState() {
  const state = useContext(AuthContext);

  return {
    ...state,
  };
}

export { AuthProvider, useAuthState };
