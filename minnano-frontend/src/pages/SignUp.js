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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Track if email is verified
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const [notification, setNotification] = useState([]); // Notification state
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || localStorage.getItem("email");

  if (!localStorage.getItem("email")) {
    localStorage.setItem("email", emailFromState);
  }

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

  const passwordRequirements = {
    length: /.{8,}/, // at least 8 characters
    uppercase: /[A-Z]/, // contains uppercase
    number: /\d/, // contains number
  };

  const validatePassword = (password) => {
    // Check if all requirements are met
    const isValid =
      passwordRequirements.length.test(password) &&
      passwordRequirements.uppercase.test(password) &&
      passwordRequirements.number.test(password);
    setPasswordValid(isValid);
    return isValid;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowRequirements(true); // Show the password requirements as soon as the user types
    validatePassword(e.target.value); // Check if password is valid
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username) {
      setNotification((prevNotification) => [
        ...prevNotification,
        { id: Date.now(), message: "Please enter a username." },
      ]);
      return;
    }

    if (!password) {
      setNotification((prevNotification) => [
        ...prevNotification,
        { id: Date.now(), message: "Please enter a valid password." },
      ]);
      return;
    }

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

  return (
    <div className="signup flex flex-col min-h-screen">
      <Header />
      {verificationStatus && (
        <p className="text-green-500">{verificationStatus}</p>
      )}

      <div className="flex-grow grid grid-cols-[7fr_5fr]">
        <div className="flex items-center justify-center">
          <img src="https://via.placeholder.com/400?text=Logo" alt="Logo" />
        </div>
        {/* Conditional Rendering for Forms */}
        {!isVerified ? (
          <div className="flex items-center justify-center text-white">
            <div className="verify-form text-start py-8 px-10 rounded-lg">
              <h1 className="text-2xl mb-4">Sign up</h1>
              <form>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
        ) : (
          <div className="flex items-center justify-center text-white">
            <div className="signup-form text-start py-8 px-10 rounded-lg">
              <h1 className="text-2xl mb-4">Sign up</h1>
              <form>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg text-sm block w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  value={emailFromState}
                  readOnly
                />
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg text-sm block w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Username"
                  required
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg text-sm block w-full p-2 mb-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Password"
                  required
                />

                <div
                  className="flex items-center space-x-2 mt-1 cursor-pointer opacity-65 text-xs"
                  onClick={togglePasswordVisibility}
                >
                  <span>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</span>
                  <span>Show Password</span>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-12 py-2 text-sm mt-1.5 rounded-lg hover:bg-red-700"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>

                <button></button>
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
        )}
      </div>

      {notification.length > 0 && <Notification notification={notification} />}
      <Footer />
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default SignUp;
