import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
const CartPage = () => {
  const {  logout } = useAuth();
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (itemId) => {
    setCart(cart.filter((item) => item._id !== itemId));
  };

  // Handle quantity change in Cart
  const changeQuantity = (item, amount) => {
    setCart(
      cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + amount }
          : cartItem
      )
    );
  };

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Navigate to checkout page
  const goToCheckout = () => {
    // Save the cart data to localStorage for access in CheckoutPage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to checkout page
    navigate("/checkout");
  };

  const goToShop = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 py-8 px-6 sm:px-8 flex justify-between items-center w-full">
        <h1 className="text-4xl sm:text-5xl text-white font-bold text-center sm:text-left w-full">
          CART
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white text-xl py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <main className="container mx-auto py-10 px-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
              >
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-lg">{item.description}</p>
                    <p className="text-xl font-bold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeQuantity(item, -1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => changeQuantity(item, 1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right mt-6 text-2xl font-bold">
              Total Price: Rs {totalPrice.toFixed(2)}
            </div>
            <button
              onClick={goToCheckout}
              className="mt-4 bg-green-600 text-2xl text-white px-10 py-3 rounded-lg"
            >
              Checkout
            </button>
          </div>
        )}
        <button
          onClick={goToShop}
          className="mt-8 bg-blue-600 text-2xl text-white px-10 py-3 rounded-lg"
        >
          Back to Shop
        </button>
      </main>
    </div>
  );
};

export default CartPage;
