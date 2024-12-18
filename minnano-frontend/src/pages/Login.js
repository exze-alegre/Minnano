import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import Loader from "../components/global/Loader";
import Notification from "../components/global/Notification";
import Facebook from "../assets/global/036-facebook.png";
import Google from "../assets/global/Google__G__logo.svg.png";
import "../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate("/signup");
      setIsLoading(false);
    }, 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setNotification((prevNotification) => [
        ...prevNotification,
        { id: Date.now(), message: "Please enter your login details." },
      ]);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      alert("Logged in!");
    } catch (err) {
      console.error(err);
      alert("Error logging in.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e); // Trigger the submit function when Enter key is pressed
    }
  };

  return (
    <div className="login flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow grid grid-cols-[7fr_5fr]">
        <div className="flex items-center justify-center">
          <img src="https://via.placeholder.com/400?text=Logo" alt="Logo" />
        </div>
        <div className="flex items-center justify-center text-white">
          <div className="login-form text-start py-8 px-10 rounded-lg">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleLogin} onKeyDown={handleKeyDown}>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between text-sm p-1">
                <small>Forgot Password?</small>
                <small>Forgot Email?</small>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-2 text-sm mt-1.5 rounded-lg hover:bg-red-700"
                >
                  Login
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
                <img src={Facebook} alt="" className="h-5 rounded-full me-2" />
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
                onClick={handleSignup}
              >
                Don't have an account yet?{" "}
                <span className="underline">Sign up</span>
              </small>
            </div>
          </div>
        </div>
      </div>
      {notification.length > 0 && <Notification notification={notification} />}

      <Footer />
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Login;
