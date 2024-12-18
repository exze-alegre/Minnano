const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController"); // Ensure path is correct

// Define the login route
router.post("/login", login);

module.exports = router;
