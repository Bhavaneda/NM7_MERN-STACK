import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// The AuthProvider component will wrap your application and provide auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state for auth
  const navigate = useNavigate();

  // Check local storage for the token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Setting the token to user state if it's found in local storage
    }
    setLoading(false);
  }, []);

  // Signup function
  const signup = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error during signup');
      }

      
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token); // Save JWT token
      setUser({ token });

      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error(error);
      alert('An error occurred during login. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  if (loading) return <div>Loading...</div>; // Loading state during the check for authentication

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext in functional components
export const useAuth = () => {
  return React.useContext(AuthContext);
};
