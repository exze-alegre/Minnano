const express = require("express");
const router = express.Router();
const {
  login,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  checkEmail,
} = require("../controllers/authController"); // Ensure path is correct

// Define the login route with /auth/login
router.post("/login", login);

// Define the verification routes with /auth/send-verification-code, /auth/resend-code, and /auth/verify-code
router.post("/send-verification-code", sendVerificationCode);
router.post("/resend-code", resendVerificationCode);
router.post("/verify-code", verifyCode);

// Define the check-email route with /auth/check-email
router.post("/check-email", checkEmail);

module.exports = router;
