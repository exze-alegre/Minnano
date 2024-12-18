// authRoutes.js

const express = require("express");
const { login } = require("../controllers/authController"); // Import the login function

const router = express.Router();

// Authentication Route
router.post("/login", login); // Use the login function as the callback for POST /login

module.exports = router; // Export the router
