import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthContext
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute wrapper
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />  {/* HomePage is protected */}
            <Route path="/shops/:id" element={<ShopPage />} /> {/* ShopPage is public */}
          <Route path="/cart" element={<CartPage />} /> {/* CartPage protected */}
          <Route path="/checkout" element={<CheckoutPage />} /> {/* CheckoutPage protected */}
          </Route>

          {/* Public Routes */}
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
