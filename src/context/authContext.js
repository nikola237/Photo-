import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
// import { useHistory } from 'react-router-dom';

//api
import api from '../api/api';

//context
const AuthContext = createContext();

//provider
function AuthProvider({ children }) {
  // const history = useHistory();
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('user')) || null
  );
  const [status, setStatus] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [token, user]);

  //login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });

      setToken(response.data.token);
      const user = await api.get(`/user/${response.data.userId}`);
      setStatus(response.data.message);

      if (user) {
        setUser(user.data);
      }
    } catch (error) {
      console.log('usao u error');
      setStatus('Incorrect email or password');
    }
  }, []);

  //logout
  const logout = () => {
    window.localStorage.clear();
    setStatus(null);
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ status, token, user, login, logout }}>
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
