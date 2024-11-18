const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");  // User model for DB
const shopRoutes = require("./routes/shopRoutes");
const authRoutes = require("./routes/authRoutes"); // Ensure this is used for routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes for authentication (use authRoutes)
app.use("/api/auth", authRoutes);  // Handling auth routes like signup and login

// Routes for shops
app.use("/api/shops", shopRoutes);  // Shop-related routes

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the SB Food Ordering App API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
