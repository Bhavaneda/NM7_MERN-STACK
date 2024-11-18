import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
const CheckoutPage = () => {
  const [cart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [address, setAddress] = useState("");
  const {logout } = useAuth(); 
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      // Handle empty cart case
      navigate("/cart");  // Redirect back to cart if empty
    }
  }, [cart, navigate]);

  const handlePlaceOrder = () => {
    // Validate fields before placing order
    if (!address || !city || !pincode || !paymentMethod) {
      setErrorMessage("Please fill all the required fields before placing the order.");
      return;
    }
    
    // If all fields are filled, place the order
    const orderData = { cart, address, city, pincode, paymentMethod };
    localStorage.setItem("orderData", JSON.stringify(orderData));

    setOrderPlaced(true);
    setTimeout(() => {
      alert("Thank you ordering! \n Your order has been confirmed! \n Estimated delivery time is 30 minutes.");
    }, 2000);
  };

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-600 py-8 px-6 sm:px-8 flex justify-between items-center w-full">
    <h1 className="text-4xl sm:text-5xl text-white font-bold text-center sm:text-left w-full mr-80">
      CHECKOUT
    </h1>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white text-xl py-2 px-6 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  </header>
      <main className="container mx-auto py-12 px-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            {/* Delivery Address Section */}
            <div>
              <label className="block text-3xl font-semibold mb-2">Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg"
                placeholder="Enter your street address"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                  placeholder="Pincode"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div>
              <label className="block text-3xl font-semibold mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-4 mb-6 border border-gray-300 rounded-lg text-lg"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="gpay">Gpay</option>
                <option value="paytm">Paytm</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Order Summary Section */}
            <div>
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2><br></br>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between text-2xl">
                    <span>{item.name}</span>
                    <span>{item.quantity} x Rs {item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Price */}
            <div className="text-right mt-4 text-3xl font-bold">
              Total Price: Rs {totalPrice.toFixed(2)}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-center text-red-600 text-lg mt-4">
                {errorMessage}
              </div>
            )}

            {/* Place Order Button */}
            <div className="text-center mt-6">
              <button
                onClick={handlePlaceOrder}
                className={`bg-green-600 text-white text-2xl px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 ${!address || !city || !pincode || !paymentMethod ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!address || !city || !pincode || !paymentMethod}
              >
                Place Order
              </button>
            </div>

            {/* Order Confirmation */}
            {orderPlaced && (
              <div className="mt-8 text-center text-xl text-green-600">
                <p>Thank you ordering!</p>
                <p>Your order has been confirmed!</p>
                <p>Estimated delivery time: 30 minutes</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
