import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import navigate to handle page redirection
import './style.css';
const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <div className="login-page">
    {/* Title outside the login container, centered at the top */}
    <h1 className="login-title">SB FOODS - FOOD ORDERING APP</h1> 
    <div className="auth-container">
      <h1 className="auth-title">SIGNUP</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">SIGN UP</button>
      </form>
      <div className="auth-footer">
        <p>
          Already have an account? 
          <span onClick={() => navigate('/login')} className="auth-link"> LOGIN</span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;
