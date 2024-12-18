const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const pool = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "your_secret_key"; // Replace with a secure secret key

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL where your React app is running
    credentials: true, // To allow cookies (session tokens) to be sent
  })
);

// Login User
// POST login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from the database based on the provided email
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rowCount === 0)
      return res.status(400).send("Invalid email or password.");

    const user = userResult.rows[0];

    // Compare the plain text password directly (no bcrypt involved here)
    if (password !== user.password)
      return res.status(400).send("Invalid email or password.");

    // Here you can create and send a session token if needed
    const sessionToken = "fake_session_token"; // Replace with actual session logic

    res
      .cookie("session_token", sessionToken, { httpOnly: true })
      .send("Logged in successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
