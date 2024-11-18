import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from context

  // Fetch the list of shops from the backend
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setShops(response.data); // Set the shops in the state
      } catch (error) {
        console.error("Error fetching shops:", error); // Handle errors
      }
    };
    fetchShops(); // Call the fetch function on component mount
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context to remove token and redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-600 py-10 px-6 sm:px-8 flex justify-between items-center w-full">
    <h1 className="text-4xl sm:text-5xl text-white font-bold text-center sm:text-left w-full mr-60">
     <br></br>
      SB FOODS - FOOD ORDERING APP
    </h1>
    
    <button
    
      onClick={handleLogout}
      
      className="bg-red-500 text-white text-xl py-2 px-6 rounded-lg hover:bg-red-600 transition mt-10"
    >
      Logout
    </button>
  </header>

  <main className="py-12">
    <div className="container mx-auto px-4 sm:px-14 max-w-screen-xl">
      <div className="space-y-10">
        {shops.length === 0 ? (
          <p>Loading shops...</p>
        ) : (
          shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col sm:flex-row transform transition hover:scale-105 hover:shadow-2xl p-6"
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full sm:w-60 h-60 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="w-full">
                <h2 className="text-4xl font-bold text-red-600 mb-3">{shop.name}</h2>
                <p className="text-2xl text-gray-700 mb-6">{shop.description}</p>
                <button
                  onClick={() => navigate(`/shops/${shop._id}`)}
                  className="mt-4 w-full sm:w-auto bg-blue-500 text-2xl text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                >
                  View Menu
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </main>
</div>

  );
};

export default HomePage;
