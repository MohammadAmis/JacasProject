// AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async (token) => {
    try {
     
      const { data } = await axios.get(' https://global-venture.onrender.com/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // const { data } = await axios.get('/api/users/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      setUser(data.user);
    } catch {
      setUser({ name: 'guest', role: 'guest' });
    }
  };

  useEffect(() => {
    let token = null;
    try {
      token = localStorage.getItem('token');
    } catch (err) {
      console.warn('localStorage access denied:', err);
    }

    if (token) {
      fetchUser(token);
    } else {
      setUser({ name: 'guest', role: 'guest' });
    }
  }, []);

  const register = async (form) => {
    try {
       const { data } = await axios.post('https://global-venture.onrender.com/api/users/register', form);
      // const { data } = await axios.post('/api/users/register', form);
      localStorage.setItem('token', data.token);
      await fetchUser(data.token);
      return true; // Return data for further processing if needed
    } catch (error) {
      // console.error("Registration failed:", error);
    }
  };

  const login = async (form) => {
    try {
      const { data } = await axios.post('https://global-venture.onrender.com/api/users/login', form);
      // const { data } = await axios.post('/api/users/login', form);
      localStorage.setItem('token', data.token);
      await fetchUser(data.token);
      return true; // Return data for further processing if needed
    } catch (error) {
      // console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      
      localStorage.removeItem('token');
      await axios.post('https://global-venture.onrender.com/api/users/logout');
      // await axios.post('/api/users/logout');
    } catch {
      // console.warn('Logout failed or localStorage unavailable');
    }
    setUser({ name: 'guest', role: 'guest' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
