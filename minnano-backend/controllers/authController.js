const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const pool = require("../config/db");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "your_secret_key";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Gmail address from .env
    pass: process.env.EMAIL_PASSWORD, // App password from .env
  },
});

const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rowCount > 0) {
      return res.status(200).json({ registered: true });
    } else {
      return res.status(200).json({ registered: false });
    }
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: err.message });
  }
};

// Function to generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Temporary in-memory storage for verification codes
const verificationCodes = {};

// POST route for sending the verification code
const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate and store the verification code
    const code = generateVerificationCode();
    verificationCodes[email] = code;

    // Send the verification code to the provided email address
    await transporter.sendMail({
      from: `"MINNANO" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. Please enter this code to verify your email.`,
    });

    res.status(200).send("Verification code sent!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send verification code.");
  }
};

// Endpoint to resend the verification code
const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateVerificationCode();
    verificationCodes[email] = code;

    await transporter.sendMail({
      from: `"MINNANO" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. Please enter this code to verify your email.`,
    });

    res.status(200).send("Verification code sent!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send verification code.");
  }
};

// POST route for verifying the code
const verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === code) {
    delete verificationCodes[email]; // Delete the code after it's used
    return res.status(200).json({ message: "Email verified", verified: true });
  }
  return res.status(400).send(`Invalid verification code: ${code}`);
};

// POST route for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rowCount === 0) {
      return res.status(400).send("Invalid email or password.");
    }

    const user = userResult.rows[0];

    if (password !== user.password) {
      return res.status(400).send("Invalid email or password.");
    }

    const sessionToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("session_token", sessionToken, { httpOnly: true })
      .send("Logged in successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// POST route for checking if the email is registered
module.exports = {
  login,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
};
