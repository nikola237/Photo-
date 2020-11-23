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
      console.log(response, 'ovo je response');
      setToken(response.data.token);
      setStatus(response.data.message);
      const user = await api.get(`/user/${response.data.userId}`);
      console.log(user, 'ovo je user');
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
