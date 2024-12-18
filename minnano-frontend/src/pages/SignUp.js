import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import Notification from "../components/global/Notification";
import Loader from "../components/global/Loader"; // Import the Loader component
import Facebook from "../assets/global/036-facebook.png";
import Google from "../assets/global/Google__G__logo.svg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons for show/hide functionality
import "../styles/pages/SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Track if email is verified
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const [notification, setNotification] = useState([]); // Notification state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailVerified = queryParams.get("email");
    if (emailVerified === "verified") {
      setIsVerified(true); // Mark email as verified
    }
  }, [location.search]);

  const handleLogin = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate("/login");
      setIsLoading(false);
    }, 500);
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!email) {
      setNotification((prevNotification) => [
        ...prevNotification,
        { id: Date.now(), message: "Please enter your email." },
      ]);
      return;
    }

    setIsLoading(true); // Show loader before making the request
    try {
      // Check if the email already exists
      const emailCheckResponse = await axios.post(
        "http://localhost:5000/auth/check-email",
        {
          email,
        }
      );

      if (emailCheckResponse.data.registered) {
        // Notify the user if the email is already registered
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message: "Email already exists. Please use another email.",
          },
        ]);
        setIsLoading(false);
        return; // Do not proceed further if email exists
      }

      // If email is not registered, proceed with sending verification code
      await axios.post("http://localhost:5000/auth/send-verification-code", {
        email,
      });

      setIsLoading(false); // Hide loader after the request is done
      navigate("/verify", { state: { email } }); // Navigate to verify page
    } catch (err) {
      console.error(
        "Error during email check or sending verification code:",
        err
      );
      setNotification((prevNotification) => [
        ...prevNotification,
        {
          id: Date.now(),
          message: "An error occurred. Please try again later.",
        },
      ]);
      setIsLoading(false); // Hide loader if error occurs
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the email, username, and password to the server
      const response = await axios.post("http://localhost:5000/register", {
        email,
        username,
        password,
      });
      // Handle response (e.g., redirect to login page)
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className="signup flex flex-col min-h-screen">
      <Header />
      {verificationStatus && (
        <p className="text-green-500">{verificationStatus}</p>
      )}

      {/* Conditional Rendering for Forms */}
      {!isVerified ? (
        <div className="flex-grow grid grid-cols-[7fr_5fr]">
          <div className="flex items-center justify-center">
            <img src="https://via.placeholder.com/400?text=Logo" alt="Logo" />
          </div>
          <div className="flex items-center justify-center text-white">
            <div className="verify-form text-start py-8 px-10 rounded-lg">
              <h1 className="text-2xl mb-4">Sign up</h1>
              <form>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-12 py-2 text-sm mt-1.5 rounded-lg hover:bg-red-700"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </form>
              <div className="grid grid-cols-3 items-center justify-center my-3">
                <hr className="opacity-40" />
                <small className="text-white text-center text-xs">or</small>
                <hr className="opacity-40" />
              </div>
              <div className="flex flex-cols items-center justify-evenly gap-5">
                <span className="bg-gray-50 rounded-lg flex items-center text-sm text-gray-900 py-1.5 px-3">
                  <img
                    src={Facebook}
                    alt=""
                    className="h-5 rounded-full me-2"
                  />
                  Facebook
                </span>
                <span className="bg-gray-50 rounded-lg flex items-center text-sm text-gray-900 py-1.5 px-3">
                  <img src={Google} alt="" className="h-5 rounded-full me-2" />
                  Google
                </span>
              </div>
              <div className="flex justify-center">
                <small
                  className="text-white text-sm py-3 cursor-pointer"
                  onClick={handleLogin}
                >
                  Already have an account?{" "}
                  <span className="underline">Login</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center text-white">
          <div className="signup-form text-start py-8 px-10 rounded-lg">
            <h1 className="text-2xl mb-4">Sign up</h1>
            <form>
              {/* Username Input */}
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* Password Input */}
              <div className="relative mb-3 text-gray-500">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative text-gray-500">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Confirm your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Password Mismatch Error */}
              {passwordMismatchError && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}

              {/* Show Password Icon and Text (Below Confirm Password) */}
              <div
                className="flex items-center space-x-2 mt-1 cursor-pointer opacity-65 text-xs"
                onClick={togglePasswordVisibility}
              >
                <span>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</span>
                <span>Show Password</span>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-2 text-sm mt-5 rounded-lg hover:bg-red-700"
                  onClick={handleFinalSubmit}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification.length > 0 && <Notification notification={notification} />}
      <Footer />
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default SignUp;
