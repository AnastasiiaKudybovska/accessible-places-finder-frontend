import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${backendUrl}/api/user/?token=${token}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const response = await axios.get(`${backendUrl}/api/user/?token=${token}`);
  
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };
  

  const login = async (email, password) => {
    const response = await axios.post(backendUrl + '/api/auth/signin', { email, password });
    localStorage.setItem('token', response.data.access_token);
    const userInfo = await getUser();
    setUser(userInfo);
  };

  const register = async (userData) => {
    const response = await axios.post(backendUrl + '/api/auth/signup', userData);
    localStorage.setItem('token', response.data.access_token);
    const userInfo = await getUser();
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);