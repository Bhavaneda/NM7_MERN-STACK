import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import AuthContext to manage authentication

const ShopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 const {logout } = useAuth(); // Get user data and logout function from AuthContext
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  // Fetch shop data and items
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopResponse = await axios.get(`http://localhost:5000/api/shops/${id}`);
        setShop(shopResponse.data.shop);
        setItems(shopResponse.data.items);
      } catch (error) {
        console.error("Error fetching shop or items:", error);
      }
    };

    fetchShopData();
  }, [id]);

  // Handle Add to Cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Handle quantity change
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

  // Navigate to the CartPage
  const goToCart = () => {
    navigate('/cart');
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen   bg-gray-100">

<header className="bg-blue-600 py-8 px-6 sm:px-8 flex justify-between items-center w-full">
        <h1 className="text-4xl sm:text-5xl text-white font-bold text-center sm:text-left w-full ml-30 mr-100">
        {shop?.name || "Loading..."}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white text-xl py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      

      <main className="container mx-auto py-10 px-10">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No items available for this shop.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-red-600">{item.name}</h3>
                  <p className="text-gray-700 text-lg my-2">{item.description}</p>
                  <p className="text-green-500 font-bold text-xl">Rs {item.price.toFixed(2)}</p>

                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() => changeQuantity(item, -1)}
                      disabled={cart.find((cartItem) => cartItem._id === item._id)?.quantity <= 0}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">
                      {cart.find((cartItem) => cartItem._id === item._id)?.quantity || 0}
                    </span>
                    <button
                      onClick={() => changeQuantity(item, 1)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={goToCart}
          className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Go to Cart
        </button>
      </main>
    </div>
  );
};

export default ShopPage;
